import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Price } from "@modules/prices/infra/typeorm/entities/Price";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
import { inject, injectable } from "tsyringe";
import { ICreatePriceDTO } from "../../dtos/ICreatePriceDTO";
import { IPricesRepository } from "../../repositories/IPricesRepository";

@injectable()
class CreatePriceUseCase {

    constructor(
        @inject("PricesRepository")
        private pricesRepository: IPricesRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("SupermarketsRepository")
        private supermarketsRepository: ISupermarketsRepository,

        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,


    ) { }

    async execute({
        product_id,
        supermarket_id,
        user_id,
        price
    }: ICreatePriceDTO): Promise<Price> {


        const product = await this.productsRepository.findById(product_id);
        if (!product) {
            throw new AppError("Product does not exists", 404);
        }

        const supermarket = await this.supermarketsRepository.findById(supermarket_id);
        if (!supermarket) {
            throw new AppError("Supermarket does not exists", 404);
        }

        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists", 404);
        }

        const priceAlreadyExists = await this.pricesRepository.findBySupermarketIdAndProductId(
            supermarket_id,
            product_id
        );

        if (priceAlreadyExists) {
            throw new AppError("Price already exists!", 409)
        }

        const priceCreated = await this.pricesRepository.create({
            product_id,
            supermarket_id,
            user_id,
            price
        })

        return priceCreated;
    }
}
export { CreatePriceUseCase }