import { CreatePriceController } from "@modules/prices/useCases/createPrice/CreatePriceController";
import { FindPriceController } from "@modules/prices/useCases/findPrice/FindPriceController";
import { UpdatePriceController } from "@modules/prices/useCases/updatePrice/UpdatePriceController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const pricesRoutes = Router();
const createPriceController = new CreatePriceController();
const findPriceController = new FindPriceController();
const updatePriceController = new UpdatePriceController();


pricesRoutes.post("/", ensureAuthenticated, createPriceController.handle);
pricesRoutes.patch("/", ensureAuthenticated, updatePriceController.handle)
pricesRoutes.get("/", ensureAuthenticated, findPriceController.handle);


export { pricesRoutes };