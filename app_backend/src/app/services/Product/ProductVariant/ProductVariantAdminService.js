const db = await import('../../../../models/index.js')
const {ProductVariant, Product} = db.default

export default class ProductVariantAdminService {

    async createVariant(productId, color, size, price, shippingCharge){

        const product = await Product.findByPk(productId);
        if (!product) {
            return { status: 422, message: `Product with ID '${productId}' not found` };
        }

        const newProductVariant = await ProductVariant.create({
            color: color,
            size: size,
            price: price,
            product_id: productId,
            shipping_charge: shippingCharge? shippingCharge: 0.00
        })

        if(!newProductVariant){
            return { status: 422, message: 'Failed to create product variant' };
        }

        return { status: 200, message: 'Product variant created successfully' };
    }
}