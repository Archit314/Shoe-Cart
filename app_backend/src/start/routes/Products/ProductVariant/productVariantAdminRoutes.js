import express from 'express';
const productVariantAdminRoutes = express.Router()

import { createProductVariant } from '../../../../app/controllers/Product/ProductVariant/ProductVariantAdminController.js';

productVariantAdminRoutes.post('/', createProductVariant)

export default productVariantAdminRoutes