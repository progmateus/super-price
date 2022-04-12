import { SupermarketsRepositoryInMemory } from "@modules/supermarkets/repositories/in-memory/SupermarketsRepositoryInMemory";
import { CreateSupermarketUseCase } from "./CreateSupermarketUseCase";



let createSupermarketUseCase: CreateSupermarketUseCase;
let supermarketsRepositoryInMemory: SupermarketsRepositoryInMemory;


describe("Create Supermarket", () => {
    beforeEach(() => {
        supermarketsRepositoryInMemory = new SupermarketsRepositoryInMemory();
        createSupermarketUseCase = new CreateSupermarketUseCase(supermarketsRepositoryInMemory)
    })


    it("Should be able to create a new Supermarket", async () => {
        const supermarket = {
            name: "Supermarket test"
        };

        await supermarketsRepositoryInMemory.create({
            name: supermarket.name
        })

        const supermarketCreated = await supermarketsRepositoryInMemory.findByName(supermarket.name)

        expect(supermarketCreated).toHaveProperty("id");
    })
})