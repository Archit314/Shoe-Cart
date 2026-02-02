import express from 'express';
const mediaAdminRoutes = express.Router()
import multer from 'multer';

import { uploadMedia } from '../../../app/controllers/Media/MediaAdminController.js';

const upload = multer({ dest: 'uploads/'})

mediaAdminRoutes.post('/upload', upload.single('image'), uploadMedia)

export default mediaAdminRoutes