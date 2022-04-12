import { AppError } from "@errors/AppError";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { ValidateProvider } from "@shared/container/providers/ValidateProvider/implementations/ValidateProvider";
import { CreateProductUseCase } from "./CreateProductUseCase";



let productsRepositoryInMemory: ProductsRepositoryInMemory;
let validateProvider: ValidateProvider;
let createProductUseCase: CreateProductUseCase;



describe("Create User", () => {

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        validateProvider = new ValidateProvider();
        createProductUseCase = new CreateProductUseCase(
            productsRepositoryInMemory,
            validateProvider
        );
    })

    it("Should be able to create a new Product", async () => {
        const product = {
            name: "name test",
            gtin: "7898940123025",
            brand: "brand test",
            thumbnail: "link image test",
        }

        await createProductUseCase.execute({
            name: product.name,
            gtin: product.gtin,
            brand: product.gtin,
            thumbnail: product.thumbnail
        })

        const productCreated = await productsRepositoryInMemory.findByGtin(product.gtin);
        expect(productCreated).toHaveProperty("id");
    })



    it("Should not be able to create a new Product with same Gtin", async () => {

        expect(async () => {
            const product = {
                name: "name test",
                gtin: "7898940123025",
                brand: "brand test",
                thumbnail: "link image test",
            }

            await createProductUseCase.execute({
                name: product.name,
                gtin: product.gtin,
                brand: product.gtin,
                thumbnail: product.thumbnail
            })

            await createProductUseCase.execute({
                name: product.name,
                gtin: product.gtin,
                brand: product.gtin,
                thumbnail: product.thumbnail
            })
        }).rejects.toBeInstanceOf(AppError)
    })




})