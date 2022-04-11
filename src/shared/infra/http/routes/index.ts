import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { pricesRoutes } from "./prices.routes";
import { productsRoutes } from "./products.routes";
import { supermarketsRoutes } from "./supermarkets.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", authenticateRoutes);
router.use("/products", productsRoutes)
router.use("/supermarkets", supermarketsRoutes)
router.use("/prices", pricesRoutes);

export { router };