import { AppError } from "@errors/AppError";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
class FindProductByGtinUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute(gtin: string) {

        if (gtin.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        const isValidGtin = await this.validateProvider.validateGtin(gtin);

        if (isValidGtin === false) {
            throw new AppError("Invalid Gtin", 400)
        }

        const product = await this.productsRepository.findByGtin(gtin);

        if (!product) {
            throw new AppError("Product not found!", 404)
        }

        return product;
    }

}
export { FindProductByGtinUseCase }