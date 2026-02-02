const db = await import('../../../models/index.js')
const {ProductVariant, Cart, CartItem} = db.default

export default class CartUserService {

    async addItemToCart(userId, productVariantId, quantity){

        const variant = await ProductVariant.findByPk(productVariantId);
        if (!variant) {
            return {status: 422, message: 'Product variant not found.' }
        }

        let cart = await Cart.findOne({ where: { user_id: userId, is_active: true } });
        if (!cart) {
            cart = await Cart.create({
                // id: uuidv4(),
                user_id: userId,
                is_active: true,
                total_cart_value: 0,
            });
        }

        let existingItem = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_variant_id: productVariantId,
            }
        });

        let item;
        if (existingItem) {
            // Update quantity and price
            existingItem.quantity += quantity;
            existingItem.price = parseFloat(variant.price) * existingItem.quantity;
            existingItem.shipping_charge = variant.shipping_charge

            await existingItem.save();
            item = existingItem;
        }else {
            item = await CartItem.create({
                // id: uuidv4(),
                cart_id: cart.id,
                product_variant_id: productVariantId,
                quantity: quantity,
                price: parseFloat(variant.price) * quantity,
                shipping_charge: variant.shipping_charge
            });
        }

        const allItems = await CartItem.findAll({ where: { cart_id: cart.id } });
        const totalCartValue = allItems.reduce((sum, item) => sum + parseFloat(item.price) + parseFloat(item.shipping_charge), 0);
        cart.total_cart_value = totalCartValue.toFixed(2);
        await cart.save();

        return {status: 200, message: `Product added successfully`, data: item}
    }

    async removeItem(productVariantId, userId){

        const cart = await Cart.findOne({
            where: { user_id: userId, is_active: true }
        });

        if (!cart) {
            return {status: 422, message: 'Active cart not found.' }
        }

        const cartItem = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_variant_id: productVariantId
            }
        });

        if (!cartItem) {
            return {status: 422, message: 'Item not found in cart.' }
        }

        await cartItem.destroy();

        const remainingItems = await CartItem.findAll({
            where: { cart_id: cart.id }
        });

        if (remainingItems.length === 0) {
            cart.total_cart_value = 0;
            await cart.save();

            return {status: 200, message: 'Item removed. Cart is now empty.'}
        }

        const totalCartValue = remainingItems.reduce((sum, item) => {
            return sum + parseFloat(item.price) + parseFloat(item.shipping_charge);
        }, 0);

        cart.total_cart_value = totalCartValue.toFixed(2);
        await cart.save();

        return {status: 200, message: `Item removed successfully`}
    }

    async getCartDetails(userId) {

        const cart = await Cart.findOne({
            where: { user_id: userId, is_active: true },
        });

        if (!cart) {
            return { status: 200, message: "Cart is empty", data: { total_cart_value: 0, items: [] } };
        }

        const cartItems = await CartItem.findAll({
            where: { cart_id: cart.id },
            include: [
                {
                    association: 'productVariants',
                    include: [
                        {
                            association: 'media',
                            attributes: ['id', 'url', 'tag', 'meta'],
                        }
                    ],
                    attributes: ['id', 'color', 'size', 'price', 'is_active']
                },
            ],
        });

        const formattedItems = cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            productVariant: item.productVariants, // from include
        }));

        return {status: 200, message: "Cart details fetched successfully", 
            data: {
                cart_id: cart.id,
                total_cart_value: parseFloat(cart.total_cart_value),
                items: formattedItems,
            },
        };
    }
}