import { CreatePriceController } from "@modules/prices/useCases/createPrice/CreatePriceController";
import { FindPriceByGtinController } from "@modules/prices/useCases/findByGtin/FindPriceByGtinController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const pricesRoutes = Router();
const createPriceController = new CreatePriceController();
const findPriceByGtinController = new FindPriceByGtinController()


pricesRoutes.post("/", ensureAuthenticated, createPriceController.handle);
pricesRoutes.get("/:gtin", ensureAuthenticated, findPriceByGtinController.handle);


export { pricesRoutes };