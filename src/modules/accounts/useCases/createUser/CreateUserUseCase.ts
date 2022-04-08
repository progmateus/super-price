import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({
        name,
        lastname,
        email,
        password,
        avatar
    }: ICreateUserDTO) {

        await this.usersRepository.create({
            name,
            lastname,
            email,
            password,
            avatar
        })




    }
}
export { CreateUserUseCase };