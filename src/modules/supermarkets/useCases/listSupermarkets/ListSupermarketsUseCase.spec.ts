import { SupermarketsRepositoryInMemory } from "@modules/supermarkets/repositories/in-memory/SupermarketsRepositoryInMemory";
import { ListSupermarketsUseCase } from "./ListSupermarketsUseCase";


let supermarketsRepositoryInMemory: SupermarketsRepositoryInMemory
let listSupermarketsUseCase: ListSupermarketsUseCase;

describe("List Supermarkets UseCase", () => {

    beforeEach(() => {
        supermarketsRepositoryInMemory = new SupermarketsRepositoryInMemory();
        listSupermarketsUseCase = new ListSupermarketsUseCase(
            supermarketsRepositoryInMemory,
        );
    })


    it("Should be able to list all supermarkets", async () => {

        const supermarket = await supermarketsRepositoryInMemory.create({
            name: "supermarket test",
        })

        const supermarkets = await listSupermarketsUseCase.execute();

        expect(supermarkets).toEqual([supermarket]);

    })
})