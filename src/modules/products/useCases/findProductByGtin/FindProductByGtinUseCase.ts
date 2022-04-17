import { AppError } from "@errors/AppError";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { getProductByGtin } from "services/api";
import { container, inject, injectable } from "tsyringe";
import { CreateProductUseCase } from "../CreateProduct/CreateProductUseCase";


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

        let product = await this.productsRepository.findByGtin(gtin);

        if (!product) {
            const getProduct = await getProductByGtin(gtin);

            const createProductUseCase = container.resolve(CreateProductUseCase);

            const productCreated = await createProductUseCase.execute({
                name: getProduct.name,
                brand: getProduct.brand,
                gtin: getProduct.gtin,
                thumbnail: getProduct.thumbnail
            });
        }

        return product;
    }

}
export { FindProductByGtinUseCase }