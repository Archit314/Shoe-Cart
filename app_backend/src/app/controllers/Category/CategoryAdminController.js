import CategoryAdminService from "../../services/Category/CategoryAdminService.js";

export const createCategory = async (req, res) => {

    try {
        const {name, brandIds} = req.body

        if(!name){
            return res.status(422).json({status: 422, message: 'Category name is required'});
        }

        const categoryAdminService = new CategoryAdminService()
        const createCategory = await categoryAdminService.createCategory(name, brandIds)
        if(createCategory.status != 200){
            return res.status(createCategory.status).json({status: createCategory.status, message: createCategory.message});
        }

        return res.status(createCategory.status).json({status: createCategory.status, message: createCategory.message, data: createCategory.date});
    } catch (error) {
        console.error('Error in Update Category Controller: createCategory', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

export const addBrandsToCategory = async (req, res) => {
    try {
        const { categoryId, brandIds } = req.body;

        if (!categoryId || !Array.isArray(brandIds) || brandIds.length === 0) {
            return res.status(422).json({ status: 422, message: 'categoryId and brandIds are required' });
        }

        const categoryAdminService = new CategoryAdminService();
        const result = await categoryAdminService.addBrandsToCategory(categoryId, brandIds);

        return res.status(result.status).json({ status: result.status, message: result.message, data: result.data || null });
    } catch (error) {
        console.error('Error in Category admin Controller: addBrandsToCategory', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ status: 422, message: 'Category name is required' });
        }

        const categoryAdminService = new CategoryAdminService();
        const result = await categoryAdminService.updateCategory(id, name);

        return res.status(result.status).json({status: result.status, message: result.message, data: result.data});

    } catch (error) {
        console.error('Error in Update Category Controller: updateCategory', error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}