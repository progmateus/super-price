import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { ValidateProvider } from "@shared/container/providers/ValidateProvider/implementations/ValidateProvider";
import { FindProductByNameUseCase } from "./FindProductByNameUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let findProductByNameUseCase: FindProductByNameUseCase;


describe("Find Product By Name useCase", () => {

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        findProductByNameUseCase = new FindProductByNameUseCase(
            productsRepositoryInMemory
        )
    })

    it("Should be able to find a Product by name", async () => {

        const product = await productsRepositoryInMemory.create({
            name: "name test",
            gtin: "7898940123025",
            brand: "brand test",
            thumbnail: "link image test",
        })

        const productCreated = await findProductByNameUseCase.execute(product.name)

        expect(productCreated[0].name).toEqual(product.name);

    })

})