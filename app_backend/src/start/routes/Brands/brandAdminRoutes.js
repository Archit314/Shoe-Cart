import express from 'express';
const brandAdminRoutes = express.Router()

import { addBrand, addCategoriesToBrand } from '../../../app/controllers/Brand/BrandAdminController.js';

brandAdminRoutes.post('/add', addBrand)
brandAdminRoutes.post('/add-categories', addCategoriesToBrand)
export default brandAdminRoutes