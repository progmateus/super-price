import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
class FindUserByEmailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute(email: string): Promise<Boolean> {

        if (email.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        const isValidEmail = this.validateProvider.ValidateEmail(email);

        if (!isValidEmail) {
            throw new AppError("Invalid email", 400)
        }

        const user = await this.usersRepository.findByEmail(email.toLocaleLowerCase())

        if (!user) {
            return false
        }

        return true

    }

}
export { FindUserByEmailUseCase };