const db = await import('../../../models/index.js')
const {Category} = db.default

export default class CategoryUserService {

    async getAllCategories(queryParameters) {

        const whereCondition = {}

        if(queryParameters.brandId){
            whereCondition.id = queryParameters.brandId
        }

        const categories = await Category.findAll({
            include: [
                {
                    association: 'media',
                    attributes: ['id', 'url', 'tag', 'meta'] // pick only necessary fields
                },
                {
                    association: 'brands',
                    where: whereCondition,
                    include: [
                        {
                            association: 'media',
                            attributes: ['id', 'url', 'tag', 'meta'],
                        }
                    ],
                    attributes: ['id', 'name', 'description', 'is_active'] // pick only necessary fields
                }
            ]
        });
        if(categories.length === 0){
            return {status: 422, message: 'No categories found'}
        }

        return {status: 200, message: 'Categories fetched successfully', data: categories}
    }
}