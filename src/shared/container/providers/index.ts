import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateProvider } from "./DateProvider/implementations/DateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { ValidateProvider } from "./ValidateProvider/implementations/ValidateProvider";
import { IValidateProvider } from "./ValidateProvider/IValidateProvider";

container.registerSingleton<IValidateProvider>(
    "ValidateProvider",
    ValidateProvider
)

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
)

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)