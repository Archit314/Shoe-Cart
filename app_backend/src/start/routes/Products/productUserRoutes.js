import express from 'express';
import { productDetail, productList } from '../../../app/controllers/Product/ProductUserController.js';
const productUserRoutes = express.Router()

productUserRoutes.get('/list', productList)
productUserRoutes.get('/:id', productDetail)

export default productUserRoutes