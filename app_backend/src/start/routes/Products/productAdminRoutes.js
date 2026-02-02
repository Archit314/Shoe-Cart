import express from 'express';
const productAdminRoutes = express.Router()

import { addProduct } from '../../../app/controllers/Product/ProductAdminController.js';

productAdminRoutes.post('/', addProduct)

export default productAdminRoutes