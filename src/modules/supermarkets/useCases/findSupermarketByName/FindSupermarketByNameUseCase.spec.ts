import { SupermarketsRepositoryInMemory } from "@modules/supermarkets/repositories/in-memory/SupermarketsRepositoryInMemory";
import { FindSupermarketByNameUseCase } from "./FindSupermarketByNameUseCase";

let findSupermarketByNameUseCase: FindSupermarketByNameUseCase;
let supermarketsRepositoryInMemory: SupermarketsRepositoryInMemory;

describe("Find supermarket by name useCase", () => {
    beforeEach(() => {
        supermarketsRepositoryInMemory = new SupermarketsRepositoryInMemory();
        findSupermarketByNameUseCase = new FindSupermarketByNameUseCase(supermarketsRepositoryInMemory)
    })


    it("Should be able to find a Supermarket by name", async () => {
        const supermarket = {
            name: "Supermarket test"
        };

        await supermarketsRepositoryInMemory.create({
            name: supermarket.name
        })

        const supermarketCreated = await findSupermarketByNameUseCase.execute(
            supermarket.name
        );

        expect(supermarketCreated.name).toEqual(supermarket.name);


    })
});