import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { productsRouter } from './routes/productsRouter';
import { authRouter } from './routes/authRouter';
import { errorMiddleware } from './middlewares/error-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const DB = process.env.DB_URL;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect(DB)
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }  
}

startServer();

