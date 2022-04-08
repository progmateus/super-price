import { AppError } from "@errors/AppError";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute({
        id,
        name,
        lastname,
        email,
        password,
    }: IUpdateUserDTO) {
        if (name?.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (lastname?.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (email?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (password?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (name && lastname || name && email || name && password ||
            lastname && email || lastname && password ||
            email && password) {
            throw new AppError("Only 1 parameter", 400)
        }


        const user = await this.usersRepository.findById(id)
        console.log(user);

        if (name) {
            const nameLowerCase = name.toLowerCase();
            const isValidName = this.validateProvider.validateName(nameLowerCase);
            if (isValidName === false) {
                throw new AppError("Invalid Name!", 400)
            }

            user.name = nameLowerCase;

            await this.usersRepository.update(user)
        }

        if (lastname) {
            const lastnameLowerCase = lastname.toLowerCase();
            const isValidLastname = this.validateProvider.validateName(lastnameLowerCase);
            if (isValidLastname === false) {
                throw new AppError("Invalid Last Name!", 400)
            }

            user.lastname = lastnameLowerCase;

            await this.usersRepository.update(user)
        }

        if (email) {
            const emailLoweCase = email.toLowerCase()
            const isValidEmail = this.validateProvider.ValidateEmail(emailLoweCase);
            if (isValidEmail === false) {
                throw new AppError("Invalid Email", 400)
            }

            const user = await this.usersRepository.findByEmail(emailLoweCase);
            if (user) {
                throw new AppError("User already exists!")
            }

            user.email = emailLoweCase;

            await this.usersRepository.update(user)
        }

        /// falta o password
        /// const passwordHash = await hash(password, 8)


    }

}
export { UpdateUserUseCase }