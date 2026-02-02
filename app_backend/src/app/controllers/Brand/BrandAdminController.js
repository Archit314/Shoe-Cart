import BrandAdminService from "../../services/Brand/BrandAdminService.js";

export const addBrand = async (req, res) => {

    try {

        const {name, categoryIds} = req.body
        
        if(!name){
            return res.status(400).json({ message: 'Brand name is required' });
        }

        const brandAdminService = new BrandAdminService()
        const createdBrand = await brandAdminService.addBrand(name, categoryIds)
        if(createdBrand.status != 200){
            return res.status(422).json({status: createdBrand.status, message: createdBrand.message });
        }

        return res.status(200).json({ status: createdBrand.status, message: createdBrand.message, data: createdBrand.data });
        
    } catch (error) {
        console.error('[BrandAdminController]: Error in addBrand:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addCategoriesToBrand = async (req, res) => {
    try {
        const { brandId, categoryIds } = req.body;

        if (!brandId || !Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(422).json({ status: 422, message: 'brandId and categoryIds[] are required' });
        }

        const brandAdminService = new BrandAdminService();
        const result = await brandAdminService.addCategoriesToBrand(brandId, categoryIds);

        return res.status(result.status).json({status: result.status, message: result.message, data: result.data || null});
    } catch (error) {
        console.error('[BrandAdminController]: Error in addCategoriesToBrand:', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};
