import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers";

export const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', createProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.patch('/:id', updateProduct);
