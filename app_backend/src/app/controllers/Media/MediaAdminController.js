import MediaAdminService from "../../services/Media/MediaAdminService.js";

export const uploadMedia = async (req, res) => {

    try {

        if(!req.file){
            return res.status(422).json({status: 422, message: 'No file uploaded'});
        }
        const {ownerId, ownerType} = req.body
        if(!ownerId || !ownerType){
            return res.status(422).json({status: 422, message: 'Owner ID and Owner Type are required'});
        }
        const imagePath = req.file.path

        const mediaAdminServie = new MediaAdminService()
        const uploadedMedia = await mediaAdminServie.uploadMedia(imagePath, ownerId, ownerType)
        
        if(uploadedMedia.status !== 200){
            return res.status(200).json({status: uploadMedia.status, message: uploadedMedia.message});
        }

        return res.status(200).json({status: 200, message: 'Image uploaded successfully'})
        
    } catch (error) {
        console.error('[MediaAdminController]: Error uploading media: uploadMedia', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}