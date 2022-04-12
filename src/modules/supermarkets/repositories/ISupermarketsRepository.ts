import { ICreateSupermarketDTO } from "../dtos/ICreateSupermarketDTO"
import { Supermarket } from "../infra/typeorm/entities/Supermarket";

interface ISupermarketsRepository {

    create(data: ICreateSupermarketDTO): Promise<void>;
    findById(id: string): Promise<Supermarket>;
    findByName(name: string): Promise<Supermarket>;
    list(): Promise<Supermarket[]>;
}
export { ISupermarketsRepository }