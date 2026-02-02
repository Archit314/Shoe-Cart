import express from 'express';
import { addBrandsToCategory, createCategory, updateCategory } from '../../../app/controllers/Category/CategoryAdminController.js';
const categoryAdminRoutes = express.Router();

categoryAdminRoutes.post('/', createCategory)
categoryAdminRoutes.post('/add-brands', addBrandsToCategory)
categoryAdminRoutes.put('/:id', updateCategory)

export default categoryAdminRoutes