import cloudinary from "../provider/Cloudinary Cloud/cloudinaryConnection.js";

export default class CloudinaryService {

    async imageUpload(file){
        try {
            
            const uploadImage = await cloudinary.uploader.upload(file)
            if(!uploadImage) {
                return { status: 422, message: 'Image upload failed' };
            }

            return { status: 200, message: 'Image uploaded successfully', data: uploadImage };
        } catch (error) {
            console.error('[CloudinaryService]: Error uploading image: imageUpload', error);
            return { status: 500, message: 'Internal server error' };
        }
    }
}