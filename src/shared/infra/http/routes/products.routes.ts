import { CreateProductController } from "@modules/products/useCases/CreateProduct/CreateProductController";
import { LitsProductsController } from "@modules/products/useCases/listProducts/ListProductsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const litsProductsController = new LitsProductsController();


productsRoutes.post("/", ensureAuthenticated, createProductController.handle);
productsRoutes.get("/", ensureAuthenticated, litsProductsController.handle);

export { productsRoutes };