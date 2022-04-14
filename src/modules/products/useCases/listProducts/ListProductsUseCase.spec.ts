import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { ListProductsUseCase } from "./ListProductsUseCase";


let productsRepositoryInMemory: ProductsRepositoryInMemory
let listProductsUseCase: ListProductsUseCase;




describe("List Products", () => {

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        listProductsUseCase = new ListProductsUseCase(
            productsRepositoryInMemory,
        );
    })


    it("Should be able to list all products", async () => {

        const product = await productsRepositoryInMemory.create({
            name: "name test",
            gtin: "7898940123025",
            brand: "brand test",
            thumbnail: "link image test",
        })

        const products = await listProductsUseCase.execute();

        expect(products).toEqual([product]);

    })
})