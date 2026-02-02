import OrderUserService from "../../services/Order/OrderUserService.js";

export const createOrder = async (req, res) => {

    try {

        const userId  = req.user.id;
        const { cartId, shippingAddress, pgName } = req.body;

        if(!cartId || !shippingAddress || !pgName){
            return res.status(422).json({status: 422, message: `Fields are missing`})
        }

        const orderUserService = new OrderUserService()
        const createdOrder = await orderUserService.createOrder(userId, cartId, shippingAddress, pgName)

        return res.status(createdOrder.status).json({status: createdOrder.status, message: createdOrder.message, data: createdOrder.data})
        
    } catch (error) {
        console.log(`[OrderUserController]: Error in createOrder`, error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

export const getOrderByCode = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderCode } = req.params;

        if (!orderCode) return res.status(422).json({ status: 422, message: 'Order code is required' });

        const orderUserService = new OrderUserService();
        const order = await orderUserService.getOrderByCode(userId, orderCode);

        return res.status(order.status).json({ status: order.status, message: order.message, data: order.data });
    } catch (error) {
        console.log(`[OrderUserController]: Error in getOrderByCode`, error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}