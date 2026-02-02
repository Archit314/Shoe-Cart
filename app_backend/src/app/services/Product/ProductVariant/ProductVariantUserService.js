const db = await import('../../../../models/index.js')
const {ProductVariant} = db.default

export default class ProductVariantUserService {

    async getAllVariantsWithMedia(productId){

        const variants = await ProductVariant.findAll({
            where: { product_id: productId },
            attributes: ['color', 'size', 'price'],
            include: [
                {
                    association: 'media',
                    attributes: ['owner_type', 'url', 'tag', 'meta'] // pick only necessary fields
                }
            ]
        });

        if(variants.length == 0){
            return {status: 422, message: `Product variants not found`}
        }

        return {status: 200, message: `Product variants fetched successfully`, data: variants}
    }
}