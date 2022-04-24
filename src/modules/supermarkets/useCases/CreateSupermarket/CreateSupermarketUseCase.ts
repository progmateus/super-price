import { AppError } from "@errors/AppError";
import { ICreateSupermarketDTO } from "@modules/supermarkets/dtos/ICreateSupermarketDTO";
import { Supermarket } from "@modules/supermarkets/infra/typeorm/entities/Supermarket";
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
    }: ICreateSupermarketDTO): Promise<Supermarket> {

        if (name.length > 100) {
            throw new AppError("Character limit exceeded", 400)
        }

        const nameLowerCase = name.toLowerCase();

        const supermarket = await this.supermarketsRepository.findByName(nameLowerCase);

        if (supermarket) {
            throw new AppError("Supermarket already exists!");
        }

        const supermarketCreated = await this.supermarketsRepository.create({
            name: nameLowerCase
        })

        return supermarketCreated;
    }

}
export { CreateSupermarketUseCase }