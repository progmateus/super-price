import { container } from "tsyringe";
import { ValidateProvider } from "./implementations/ValidateProvider";
import { IValidateProvider } from "./IValidateProvider";

container.registerSingleton<IValidateProvider>(
    "ValidateProvider",
    ValidateProvider
)