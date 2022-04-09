import { AppError } from "@errors/AppError";
import { ICreateSupermakertdTO } from "@modules/superomarkets/dtos/ICreateSupermarketDTO";
import { ISupermarketsRepository } from "@modules/superomarkets/repositories/ISupermarketsRepository";
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