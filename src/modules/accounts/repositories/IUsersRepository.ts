import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {

    create(data: ICreateUserDTO): Promise<void>;
    update(data: IUpdateUserDTO): Promise<void>;
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>

}
export { IUsersRepository };