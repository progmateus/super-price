import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../../infra/typeorm/entities/User";



class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    async create({
        name,
        lastname,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            lastname,
            email,
            password,
        })

        this.users.push(user);
    }

    async update({
        id,
        name,
        lastname,
        email,
        password,
    }: IUpdateUserDTO): Promise<void> {
        const user = await this.findById(id);

        Object.assign(user, {
            name,
            lastname,
            email,
            password,
        })

        this.users.push(user);
    }

    async findById(id: string): Promise<User> {
        const user = await this.users.find((user => user.id === id))
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.users.find((user => user.email === email))
        return user;
    }

}
export { UsersRepositoryInMemory }