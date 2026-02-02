import express from 'express';
const authRoutes = express.Router();

import { signIn, signUp } from '../../../app/controllers/Users/UserController.js';

authRoutes.post('/sign-up', signUp);
authRoutes.post('/sign-in', signIn);

export default authRoutes