import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productControllers";

export const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', createProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.patch('/:id', updateProduct);
