import { CreatePriceController } from "@modules/prices/useCases/createPrice/CreatePriceController";
import { FindPriceController } from "@modules/prices/useCases/findPrice/FindPriceController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const pricesRoutes = Router();
const createPriceController = new CreatePriceController();
const findPriceController = new FindPriceController();


pricesRoutes.post("/", ensureAuthenticated, createPriceController.handle);
pricesRoutes.get("/find", ensureAuthenticated, findPriceController.handle);


export { pricesRoutes };