import express from 'express';
const productVariantUserRoutes = express.Router()

import { listProductVariants } from '../../../../app/controllers/Product/ProductVariant/ProductVariantUserController.js';

productVariantUserRoutes.get('/:productId', listProductVariants)

export default productVariantUserRoutes