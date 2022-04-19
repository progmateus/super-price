import { AppError } from "@errors/AppError";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { container, inject, injectable } from "tsyringe";
import { CreateProductUseCase } from "../CreateProduct/CreateProductUseCase";



@injectable()
class FindProductByNameUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute(name: string): Promise<Product[]> {
        if (name.length > 100) {
            throw new AppError("Character limit exceeded", 400)
        }

        let products = await this.productsRepository.findByName(name);

        /*  if (!product) {

              const getProduct = await getProductByGtin(gtin);
  
              switch (getProduct.status) {
                  case 200:
                      const createProductUseCase = container.resolve(CreateProductUseCase);
  
                      product = await createProductUseCase.execute({
                          name: getProduct.data.description,
                          brand: getProduct.data.brand.name,
                          gtin: getProduct.data.gtins[0].gtin,
                          thumbnail: getProduct.data.thumbnail
                      });
                      break;
  
                  case 404:
                      throw new AppError("Product not found", 404)
                  default:
                      throw new AppError("Internal server error", 400)
              }
          } */

        return products;
    }
}
export { FindProductByNameUseCase };