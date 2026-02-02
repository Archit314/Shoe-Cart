const db = await import('../../../models/index.js')
const {User, Cart, CartItem, Order} = db.default

import CashfreeService from '../CashfreeService.js';

export default class OrderUserService{

    async createOrder(userId, cartId, shippingAddress, pgName){
        // Use a DB transaction to ensure ACID for order creation and cart state
        const sequelize = db.default.sequelize
        const t = await sequelize.transaction()
        try {
            const existUser = await User.findOne({ where: { id: userId }, transaction: t })
            if (!existUser) {
                await t.rollback()
                return { status: 422, message: `User not found` }
            }

            const cart = await Cart.findOne({ where: { id: cartId, user_id: userId }, transaction: t })
            if (!cart) {
                await t.rollback()
                return { status: 422, message: `Cart not found` }
            }

            if (!cart.is_active) {
                await t.rollback()
                return { status: 422, message: `Cart not found` }
            }

            const cartItems = await CartItem.findAll({ where: { cart_id: cart.id }, transaction: t })
            if (!cartItems || cartItems.length === 0) {
                await t.rollback()
                return { status: 422, message: "Cart is empty or invalid" }
            }

            // compute total dynamically from cart items (fallback to cart.total_cart_value)
            const calculatedTotal = cartItems.reduce((sum, it) => {
                const price = Number(it.price ?? it.unit_price ?? 0);
                const qty = Number(it.quantity ?? it.qty ?? 1);
                return sum + price * qty;
            }, 0);

            const totalAmount = calculatedTotal || Number(cart.total_cart_value || 0);

            // generate a more-unique order code
            const orderCode = `KICKZ-${userId}-${Date.now().toString().slice(-6)}`;

            const newOrder = await Order.create({
                code: orderCode,
                user_id: userId,
                cart_id: cartId,
                total_amount: totalAmount,
                payment_status: `PENDING`,
                status: 'PENDING',
                shipping_address: shippingAddress,
                pg_name: pgName
            }, { transaction: t })

            if (!newOrder) {
                await t.rollback()
                return { status: 422, message: `Order creation failed` }
            }

            // prepare payload for Cashfree including item details
            const itemsForPayload = cartItems.map(ci => ({
                id: ci.id,
                product_variant_id: ci.product_variant_id ?? ci.product_variant ?? null,
                price: Number(ci.price ?? ci.unit_price ?? 0),
                quantity: Number(ci.quantity ?? ci.qty ?? 1),
                name: ci.name ?? ci.product_name ?? undefined
            }));

            const payload = {
                order_amount: newOrder.total_amount,
                order_currency: 'INR',
                customer_details: {
                    customer_id: userId,
                    customer_name: existUser.name,
                    customer_phone: existUser.mobile_number,
                    customer_email: existUser.email
                },
                order_id: newOrder.code,
                // return_url tells Cashfree where to redirect after payment
                // include order code so frontend can fetch order status or show confirmation
                order_meta: {
                    return_url: `${process.env.FRONTEND_ORIGIN}/order/confirm?order_code=${newOrder.code}`,
                },
                items: itemsForPayload
            }

            const cashfreeService = new CashfreeService()
            const createdPgOrder = await cashfreeService.createCfOrder(payload)

            if (createdPgOrder.status !== 200) {
                // rollback DB changes if PG creation failed
                await t.rollback()
                return { status: 422, message: `Order creation failed` }
            }

            // persist PG response and deactivate cart within the transaction
            newOrder.pg_response = createdPgOrder.data;
            await newOrder.save({ transaction: t })

            cart.is_active = false
            await cart.save({ transaction: t })

            await t.commit()
            return { status: 200, message: `Order created successfully`, data: newOrder }
        } catch (error) {
            try { await t.rollback() } catch (e) { /* ignore rollback errors */ }
            console.log('[OrderUserService]: createOrder error', error)
            return { status: 500, message: 'Internal server error' }
        }
    }

    async getOrderByCode(userId, orderCode){
        const order = await Order.findOne({ where: { code: orderCode, user_id: userId } });
        if(!order) return { status: 422, message: 'Order not found', data: null }

        return { status: 200, message: 'Order fetched', data: order }
    }
}