import CloudinaryService from "../CloudinaryService.js";
const db = await import('../../../models/index.js')
const {Media} = db.default

export default class MediaAdminService {

    async uploadMedia(imagePath, ownerId, ownerType){

        const cloudinaryService = new CloudinaryService()
        const uploadedImage = await cloudinaryService.imageUpload(imagePath)
        if(uploadedImage.status != 200){
            return { status: uploadedImage.status, message: uploadedImage.message };
        }

        const imageUrl = uploadedImage.data.secure_url

        const newMedia = new Media()
        newMedia.url = imageUrl
        newMedia.owner_id = ownerId
        newMedia.owner_type = ownerType
        await newMedia.save()

        if(!newMedia){
            return { status: 422, message: 'Media upload failed' };
        }

        console.log('[MediaAdminService]: Media uploaded successfully:');
        return { status: 200, message: 'Media uploaded successfully', data: newMedia };
    }
}