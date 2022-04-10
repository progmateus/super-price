import { AppError } from "@errors/AppError";
import { ICreateSupermakertdTO } from "@modules/supermarkets/dtos/ICreateSupermarketDTO";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateSupermarketUseCase {

    constructor(
        @inject("SupermarketsRepository")
        private supermarketsRepository: ISupermarketsRepository
    ) { }

    async execute({
        name,
    }: ICreateSupermakertdTO) {

        if (name.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        const nameLowerCase = name.toLowerCase();

        const supermarket = await this.supermarketsRepository.findByName(nameLowerCase);
        console.log("supermarket: ", supermarket)
        if (supermarket) {
            throw new AppError("Supermarket already exists!");
        }

        await this.supermarketsRepository.create({
            name: nameLowerCase
        })
    }

}
export { CreateSupermarketUseCase }