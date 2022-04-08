import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { container } from "tsyringe";
import "../container/providers/index"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);