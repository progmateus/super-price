import { AppError } from "@errors/AppError";
import { Supermarket } from "@modules/supermarkets/infra/typeorm/entities/Supermarket";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
class FindSupermarketByNameUseCase {

    constructor(
        @inject("SupermarketsRepository")
        private supermarketsRepository: ISupermarketsRepository,
    ) { }

    async execute(name: string): Promise<Supermarket> {

        if (name.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        const supermarket = await this.supermarketsRepository.findByName(name);

        if (!supermarket) {
            throw new AppError("Supermarket not found!", 404);
        }

        return supermarket
    }
}
export { FindSupermarketByNameUseCase }