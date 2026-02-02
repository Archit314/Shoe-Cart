import BrandUserService from "../../services/Brand/BrandUserService.js";

export const getBrands = async (req, res) => {

    try {

        const queryParameters = req.query;
        
        const brandUserService = new BrandUserService()
        const getBrands = await brandUserService.getBrands(queryParameters)
        if(getBrands.status != 200){
            return res.status(422).json({ status: getBrands.status, message: getBrands.message });
        }

        return res.status(200).json({ status: getBrands.status, message: getBrands.message, data: getBrands.data });
    } catch (error) {
        console.error('[BrandUserController]: Error in getBrands:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}