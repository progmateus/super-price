import { getRepository, Repository } from "typeorm"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../entities/User";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        id,
        name,
        lastname,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            lastname,
            email,
            password
        })

        await this.repository.save(user);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id)
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user;
    }

    async update({
        id,
        name,
        lastname,
        email,
        password
    }: IUpdateUserDTO) {
        const user = this.repository.create({
            id,
            name,
            lastname,
            email,
            password,
        })

        await this.repository.save(user);

    }

}
export { UsersRepository };