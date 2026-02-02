import ProductVariantUserService from "../../../services/Product/ProductVariant/ProductVariantUserService.js";

export const listProductVariants = async (req, res) => {
    try {

        const { productId } = req.params;

        if (!productId) {
        return res.status(422).json({ status: 422, message: "Product ID is required" });
        }

        const productVariantAdminService = new ProductVariantUserService();
        const getProductVariantList = await productVariantAdminService.getAllVariantsWithMedia(productId);

        return res.status(getProductVariantList.status).json({status: getProductVariantList.status, message: getProductVariantList.message, data: getProductVariantList.data});
    } catch (error) {
        console.error("[ProductVariantAdminController]: listProductVariants error", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};