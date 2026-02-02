const db = await import('../../../models/index.js')
const {Brand, Category, sequelize} = db.default

export default class BrandAdminService {

    async addBrand(name, categoryIds = []){

        const transaction = await sequelize.transaction()

        try {

            const newBrand = await Brand.create({
                name: name
            }, { transaction })

            if(categoryIds && categoryIds.length > 0){
                const categories = await Category.findAll({
                    where: {
                        id: categoryIds
                    },
                    transaction
                })

                if(categories.length !== categoryIds.length){
                    const foundIds = categories.map((category) => category.id)
                    const missingIds = categoryIds.filter((category) => !foundIds.includes(category))

                    await transaction.rollback()
                    return {status: 422, message: `Invalid category IDs: ${missingIds.join(', ')}`}
                }

                await newBrand.addCategories(categories,  { transaction })
            }

            await transaction.commit()

            return { status: 200, message: 'Brand created successfully', data: newBrand };
        } catch (error) {
            console.error('[BrandAdminService]: Error in addBrand:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }

    async addCategoriesToBrand(brandId, categoryIds = []) {

        const transaction = await sequelize.transaction();

        try {
            const brand = await Brand.findByPk(brandId, {
                include: [Category],
                transaction,
            });

            if (!brand) {
                await transaction.rollback();
                return { status: 404, message: 'Brand not found' };
            }

            const categories = await Category.findAll({
                where: { id: categoryIds },
                transaction,
            });

            if (categories.length !== categoryIds.length) {
                const foundIds = categories.map(c => c.id);
                const missingIds = categoryIds.filter(id => !foundIds.includes(id));
                await transaction.rollback();
                return { status: 422, message: `Invalid category IDs: ${missingIds.join(', ')}` };
            }

            const alreadyAssociatedIds = brand.Categories.map(c => c.id);
            const duplicateIds = categoryIds.filter(id => alreadyAssociatedIds.includes(id));

            if (duplicateIds.length > 0) {
                await transaction.rollback();
                return {status: 409, message: `These category(ies) already added to the brand: ${duplicateIds.join(', ')}`};
            }

            await brand.addCategories(categories, { transaction });

            await transaction.commit();
            return { status: 200, message: 'Categories added to brand successfully', data: brand };

        } catch (error) {
            console.error('[BrandAdminService]: Error in addCategoriesToBrand:', error);
            await transaction.rollback();
            return { status: 500, message: 'Internal Server Error' };
        }
    }

}