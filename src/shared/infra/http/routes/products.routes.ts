import { CreateProductController } from "@modules/products/useCases/CreateProduct/CreateProductController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();


productsRoutes.post("/", ensureAuthenticated, createProductController.handle);

export { productsRoutes };