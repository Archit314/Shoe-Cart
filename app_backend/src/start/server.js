import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors"
const app = express();

import { connectDb } from '../app/provider/aiven database/databaseConnection.js';
import authRoutes from './routes/Users/authRoute.js';

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

app.listen(9000, () => {
  console.log('Server is running on http://localhost:9000');
  connectDb()
});