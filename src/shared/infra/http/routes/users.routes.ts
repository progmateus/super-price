import { Router } from "express";
import uploadConfig from "@config/upload"
import multer from "multer";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))
const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController
const uploadUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    uploadUserAvatarController.handle);
usersRoutes.put("/edit", ensureAuthenticated, updateUserController.handle);


export { usersRoutes };

