import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { SupermarketsRepository } from "@modules/superomarkets/infra/typeorm/repositories/SupermarketsRepository";
import { ISupermarketsRepository } from "@modules/superomarkets/repositories/ISupermarketsRepository";
import { container } from "tsyringe";
import "../container/providers/index"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
)

container.registerSingleton<ISupermarketsRepository>(
    "SupermarketsRepository",
    SupermarketsRepository
)