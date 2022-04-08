import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/products", productsRoutes)

export { router };