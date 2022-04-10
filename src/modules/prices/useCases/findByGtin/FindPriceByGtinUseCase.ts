import { AppError } from "@errors/AppError";
import { Price } from "@modules/prices/infra/typeorm/entities/Price";
import { IPricesRepository } from "@modules/prices/repositories/IPricesRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPriceByGtinUseCase {

    constructor(
        @inject("PricesRepository")
        private pricesRepository: IPricesRepository,

        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute(gtin: string): Promise<Price[]> {

        const product = await this.productsRepository.findByGtin(gtin)
        if (!product) {
            throw new AppError("Product not found!", 404);
        }

        const prices = await this.pricesRepository.findByProductId(product.id);

        if (prices.length === 0) {
            throw new AppError("Price not found", 404);
        }

        return prices;

    }
}
export { FindPriceByGtinUseCase };