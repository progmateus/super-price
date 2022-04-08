import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController

usersRoutes.post("/", createUserController.handle);
usersRoutes.put("/edit", ensureAuthenticated, updateUserController.handle);


export { usersRoutes };

