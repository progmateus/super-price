import { Supermarket } from "@modules/supermarkets/infra/typeorm/entities/Supermarket";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
import { inject, injectable } from "tsyringe";
import { getCustomRepository, Repository } from "typeorm";


@injectable()
class ListSupermarketsUseCase {

    constructor(
        @inject("SupermarketsRepository")
        private supermarketsRepository: ISupermarketsRepository
    ) { }

    async execute(): Promise<Supermarket[]> {

        const supermarkets = await this.supermarketsRepository.list();
        return supermarkets;

    }
}
export { ListSupermarketsUseCase }