import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors"
const app = express();

import { connectDb } from './app/provider/aiven database/databaseConnection.js';
import authRoutes from './start/routes/Users/authRoutes.js';
import { startPingScheduler } from './app/schedulers/pingScheduler.js';
import categoryUserRoutes from './start/routes/Categories/categoryUserRoutes.js';
import categoryAdminRoutes from './start/routes/Categories/categoryAdminRoutes.js';
import mediaAdminRoutes from './start/routes/Media/mediaAdminRoutes.js';
import brandAdminRoutes from './start/routes/Brands/brandAdminRoutes.js';
import brandUserRoutes from './start/routes/Brands/brandUserRoutes.js';
import productAdminRoutes from './start/routes/Products/productAdminRoutes.js';
import productUserRoutes from './start/routes/Products/productUserRoutes.js';
import productVariantAdminRoutes from './start/routes/Products/ProductVariant/productVariantAdminRoutes.js';
import productVariantUserRoutes from './start/routes/Products/ProductVariant/productVariantUserRoutes.js';
import cartUserRoutes from './start/routes/Cart/cartUserRoutes.js';
import orderUserRoutes from './start/routes/Order/orderUserRoutes.js';

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}))

app.get('/ping', (req, res) => {
  console.log('[Server]: Ping route hit');
  res.status(200).json({ message: 'Pong, your server is Alive!' });
})

app.use('/v1/api/user', authRoutes)
app.use('/v1/api/category', categoryUserRoutes)
app.use('/v1/api/admin/category', categoryAdminRoutes)
app.use('/v1/api/admin/media', mediaAdminRoutes)
app.use('/v1/api/admin/brand', brandAdminRoutes)
app.use('/v1/api/user/brand', brandUserRoutes)
app.use('/v1/api/admin/product', productAdminRoutes)
app.use('/v1/api/user/product', productUserRoutes)
app.use('/v1/api/admin/product-variant', productVariantAdminRoutes)
app.use('/v1/api/user/product-variant', productVariantUserRoutes)
app.use('/v1/api/user/cart', cartUserRoutes)
app.use('/v1/api/user/order', orderUserRoutes)

app.listen(9000, () => {
  console.log('Server is running on http://localhost:3000');
  connectDb()
  startPingScheduler()
});