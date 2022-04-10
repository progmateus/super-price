import { CreateSupermarketController } from "@modules/supermarkets/useCases/CreateSupermarket/CreateSupermarketController";
import { ListSupermarketsController } from "@modules/supermarkets/useCases/listSupermarkets/ListSupermarketsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const supermarketsRoutes = Router();
const createSupermarketController = new CreateSupermarketController();
const listSupermarketsController = new ListSupermarketsController();


supermarketsRoutes.post("/", ensureAuthenticated, createSupermarketController.handle)
supermarketsRoutes.get("/", ensureAuthenticated, listSupermarketsController.handle);

export { supermarketsRoutes };