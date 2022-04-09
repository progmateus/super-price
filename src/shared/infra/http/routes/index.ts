import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { productsRoutes } from "./products.routes";
import { supermarketsRoutes } from "./supermarkets.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/products", productsRoutes)
router.use("/supermarkets", supermarketsRoutes)

export { router };