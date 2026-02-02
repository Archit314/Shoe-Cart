const db = await import('../../../models/index.js')
const {User, Cart, CartItem, Order} = db.default

import CashfreeService from '../CashfreeService.js';

export default class OrderUserService{

    async createOrder(userId, cartId, shippingAddress, pgName){

        const existUser = await User.findOne({
            where: {id: userId}
        })
        if(!existUser){
            return {status: 422, message: `User not found`}
        }

        const cart = await Cart.findOne({
            where: { id: cartId, user_id: userId }
        });

        if(!cart){
            return {status: 422, message: `Cart not found`}
        }

        if(!cart.is_active){
            return {status: 422, message: `Cart not found`}
        }

        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cart.id
            }
        });

        if (!cartItems || cartItems.length === 0) {
            return { status: 422, message: "Cart is empty or invalid" }
        }

        const newOrder = await Order.create({
            code: `KICKZ-9`,
            user_id: userId,
            cart_id: cartId,
            total_amount: cart.total_cart_value,
            payment_status: `PENDING`,
            status: 'PENDING',
            shipping_address: shippingAddress,
            pg_name: pgName
        })

        if(!newOrder){
            return {status: 422, message: `Order creation failed`}
        }

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
        }

        const cashfreeService = new CashfreeService()
        const createdPgOrder = await cashfreeService.createCfOrder(payload)

        if(createdPgOrder.status !== 200){
            return {status: 422, message: `Order creation failed`}
        }

        newOrder.pg_response = createdPgOrder.data
        await newOrder.save()

        cart.is_active = false
        await cart.save()

        return {status: 200, message: `Order created successfully`, data: newOrder}
    }
}