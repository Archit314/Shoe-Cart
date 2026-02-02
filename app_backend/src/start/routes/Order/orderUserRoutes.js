import express from 'express'
const orderUserRoutes = express.Router()

import { userAuthMiddleware } from '../../../app/middleware/UserAuth/UserAuthMiddleware.js'
import { createOrder } from '../../../app/controllers/Order/OrderUserController.js'

orderUserRoutes.post('/create', userAuthMiddleware, createOrder)

export default orderUserRoutes