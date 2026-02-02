import ProductAdminService from "../../services/Product/ProductAdminService.js";

export const addProduct = async (req, res) => {

    try {
        const { name, description, brandId, categoryId } = req.body;

        // Basic validation
        if (!name || !brandId || !categoryId) {
            return res.status(422).json({status: 422, message: 'Missing required fields: name, brand_id, category_id'});
        }

        const productAdminService = new ProductAdminService()
        const createdProduct = await productAdminService.createProduct(name, description, brandId, categoryId)

        return res.status(createdProduct.status).json({status: createdProduct.status, message: createdProduct.message, data: createdProduct.data});
    } catch (error) {
        console.error('Error in ProductAdmin Controller: addProduct', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}