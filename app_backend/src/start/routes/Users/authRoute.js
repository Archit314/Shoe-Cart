import express from 'express';
const authRoutes = express.Router();

import { checkAuth, logout, signIn, signUp } from '../../../app/controllers/Users/UserController.js';
import { userAuthMiddleware } from '../../../app/middleware/UserAuth/UserAuthMiddleware.js';

authRoutes.post('/sign-up', signUp);
authRoutes.post('/sign-in', signIn);
authRoutes.get('/logout', logout);
authRoutes.get('/check-auth', userAuthMiddleware, checkAuth)

export default authRoutes