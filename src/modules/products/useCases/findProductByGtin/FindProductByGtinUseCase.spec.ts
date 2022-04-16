import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { ValidateProvider } from "@shared/container/providers/ValidateProvider/implementations/ValidateProvider";
import { FindProductByGtinUseCase } from "./FindProductByGtinUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let validateProvider: ValidateProvider;
let findProductByGtinUseCase: FindProductByGtinUseCase;


describe("Find Product By Gtin useCase", () => {

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        validateProvider = new ValidateProvider();
        findProductByGtinUseCase = new FindProductByGtinUseCase(
            productsRepositoryInMemory,
            validateProvider
        )
    })

    it("Should be able to find a Product by gtin", async () => {

        const product = await productsRepositoryInMemory.create({
            name: "name test",
            gtin: "7898940123025",
            brand: "brand test",
            thumbnail: "link image test",
        })

        const productCreated = await findProductByGtinUseCase.execute(product.gtin);

        expect(productCreated.name).toEqual(product.name);

    })

})