import { CreatePriceController } from "@modules/prices/useCases/CreatePriceController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const pricesRoutes = Router();
const createPriceController = new CreatePriceController();


pricesRoutes.post("/", ensureAuthenticated, createPriceController.handle);

export { pricesRoutes };