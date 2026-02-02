import express from 'express';
import { getBrands } from '../../../app/controllers/Brand/BrandUserController.js';
const brandUserRoutes = express.Router()

brandUserRoutes.get('/', getBrands)

export default brandUserRoutes