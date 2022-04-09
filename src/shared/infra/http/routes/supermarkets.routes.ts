import { CreateSupermarketController } from "@modules/superomarkets/useCases/CreateSupermarket/CreateSupermarketController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const supermarketsRoutes = Router();
const createSupermarketController = new CreateSupermarketController();


supermarketsRoutes.post("/", ensureAuthenticated, createSupermarketController.handle)

export { supermarketsRoutes };