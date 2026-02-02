import ProductUserService from "../../services/Product/ProductUserService.js";

export const productList = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1
        const maxRows = parseInt(req.query.maxRows) || 1
        
        const productUserService = new ProductUserService()
        const getAllProducts = await productUserService.getAllProducts(page, maxRows, req.query)

        return res.status(getAllProducts.status).json({status: getAllProducts.status, message: getAllProducts.message, pagination: getAllProducts.pagination, data: getAllProducts.data})
    } catch (error) {
        console.error('Error in User product Controller: productList', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

export const productDetail = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ status: 400, message: 'Product ID is required' });
        }

        const productUserService = new ProductUserService();
        const getProduct = await productUserService.getProductDetail(productId);

        return res.status(getProduct.status).json({status: getProduct.status, message: getProduct.message, data: getProduct.data});
    } catch (error) {
        console.error('Error in User Product Controller: productDetail', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};