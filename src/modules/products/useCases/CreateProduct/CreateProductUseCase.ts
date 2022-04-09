import { AppError } from "@errors/AppError";
import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateProductUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }


    async execute({
        name,
        gtin,
        brand,
        thumbnail,
    }: ICreateProductDTO): Promise<void> {

        const product = await this.productsRepository.findByGtin(gtin)

        if (product) {
            throw new AppError("Product already exists!")
        }

        await this.productsRepository.create({
            name: name.toLowerCase(),
            gtin,
            brand: brand.toLowerCase(),
            thumbnail,
        });


    }

}
export { CreateProductUseCase }