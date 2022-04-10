import { container } from "tsyringe";
import { ValidateProvider } from "./ValidateProvider/implementations/ValidateProvider";
import { IValidateProvider } from "./ValidateProvider/IValidateProvider";

container.registerSingleton<IValidateProvider>(
    "ValidateProvider",
    ValidateProvider
)