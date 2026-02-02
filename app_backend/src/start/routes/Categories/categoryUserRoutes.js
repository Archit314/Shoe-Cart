import express from 'express';
const categoryUserRoutes = express.Router();

import { list } from '../../../app/controllers/Category/CategoryUserController.js';

categoryUserRoutes.get('/', list)

export default categoryUserRoutes