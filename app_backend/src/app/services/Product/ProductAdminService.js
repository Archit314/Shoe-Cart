const db = await import('../../../models/index.js')
const {Product, Brand, Category} = db.default

export default class ProductAdminService {

    async createProduct(name, description, brandId, categoryId){

        // Check if Brand exists
        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            return res.status(422).json({status: 422, message: `Brand with ID '${brandId}' does not exist.`});
        }

        // Check if Category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(422).json({status: 422, message: `Category with ID '${categoryId}' does not exist.`});
        }

       try {
         const newProduct = await Product.create({
            name: name,
            description: description,
            category_id: categoryId,
            brand_id: brandId,
            is_active: true
         })
 
         if(!newProduct){
             return {status: 422, message: `Product creation failed`}
         }
 
         return {status: 200, message: `Product created successfully`}
       } catch (error) {
            console.error('Error in ProductAdminService: createProduct', error);
            return {status: 500, message: 'Internal Server Error'};
       }
    }
}