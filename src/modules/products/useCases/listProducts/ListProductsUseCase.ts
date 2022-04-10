import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListProductsUseCase {


    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }


    async execute(): Promise<Product[]> {
        const products = await this.productsRepository.listProducts()
        return products;
    }
}
export { ListProductsUseCase }