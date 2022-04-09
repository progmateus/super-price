import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PricesRepository } from "@modules/prices/infra/typeorm/repositories/PricesRepository";
import { IPricesRepository } from "@modules/prices/repositories/IPricesRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { SupermarketsRepository } from "@modules/supermarkets/infra/typeorm/repositories/SupermarketsRepository";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
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

container.registerSingleton<IPricesRepository>(
    "PricesRepository",
    PricesRepository
)