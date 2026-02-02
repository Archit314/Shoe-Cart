import ProductVariantAdminService from "../../../services/Product/ProductVariant/ProductVariantAdminService.js";

export const createProductVariant = async (req, res) => {
    try {

        const {color, size, price, shippingCharge, productId} = req.body

        if(!color || !size || !price || !productId) {
            return res.status(422).json({status: 422, message: `Color, Size, Price and Product Id are required`})
        }

        const productVariantAdminService = new ProductVariantAdminService
        const createdProductVariant = await productVariantAdminService.createVariant(productId, color, size, price, shippingCharge);

        return res.status(createdProductVariant.status).json({status: createdProductVariant.status, message: createdProductVariant.message, data: createdProductVariant.data});
    } catch (error) {
        console.error('[ProductVariantAdminController]: createProductVariant error', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};