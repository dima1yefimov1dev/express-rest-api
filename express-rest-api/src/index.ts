import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { Product } from './models/products';
import { productsRouter } from './routes/productsRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const DB = process.env.DB_URL;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', productsRouter);

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

