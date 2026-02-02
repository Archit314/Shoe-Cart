import express from "express"
const cartUserRoutes = express.Router()

import { addItemToCart, getCartDetails, removeItemFromCart, updateCartItem } from "../../../app/controllers/Cart/CartUserController.js"
import { userAuthMiddleware } from "../../../app/middleware/UserAuth/UserAuthMiddleware.js"

cartUserRoutes.post('/', userAuthMiddleware, addItemToCart)
cartUserRoutes.delete('/:productVariantId', userAuthMiddleware, removeItemFromCart)
cartUserRoutes.patch('/:productVariantId', userAuthMiddleware, updateCartItem)
cartUserRoutes.get('/', userAuthMiddleware, getCartDetails)

export default cartUserRoutes