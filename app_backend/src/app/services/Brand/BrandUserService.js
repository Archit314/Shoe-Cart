const db = await import('../../../models/index.js')
const {Brand} = db.default

export default class BrandUserService {

    async getBrands(queryParameters) {

        const whereCondition = {}

        if(queryParameters.categoryId){
            whereCondition.id = queryParameters.categoryId
        }

        try {
            const brands = await Brand.findAll({
                include: [
                    {
                        association: 'media',
                        attributes: ['id', 'url', 'tag', 'meta'] // pick only necessary fields
                    },
                    {
                        association: 'categories',
                        where: whereCondition,
                        include: [
                            {
                                association: 'media',
                                attributes: ['id', 'url', 'tag', 'meta'],
                            }
                        ],
                        attributes: ['id', 'name', 'is_active'] // pick only necessary fields
                    }
                ]
            });
            if(brands.length === 0){
                return {status: 422, message: 'No brands found'}
            }
    
            return {status: 200, message: 'brands fetched successfully', data: brands}
        } catch (error) {
            console.error('[BrandUserService]: Error in getBrands:', error);
            return {status: 500, message: 'Internal Server Error'};
        }
    }
}