import { Request, Response } from "express";
import { Product, ProductDocument } from "../models/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find();

    if (products.length) {
      const mappedProducts = products.map(product => {
        const id = product._id.toString();
        const { title, price, description, imageUrl } = product;
        return { id, title, price, description, imageUrl };
      });

      res.status(200).send(mappedProducts);
    } else {
      res.status(200).send([]);
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const removedProduct = await Product.findByIdAndDelete(id);

    res.status(200).send(removedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const newParams = req.body;

    const validFields = Object.keys(newParams).every(param => Product.schema.obj[param]);

    if (!validFields) {
      return res.status(400).send('Invalid fields detected.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,newParams);

    res.status(200).send(updatedProduct);

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const getProduct = async (req:Request, res: Response) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};