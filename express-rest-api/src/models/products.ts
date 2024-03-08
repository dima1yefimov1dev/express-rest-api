import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

export const Product = model<IProduct>('Product', ProductSchema);
export type ProductDocument = IProduct;