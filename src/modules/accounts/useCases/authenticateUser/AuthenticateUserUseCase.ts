import { compare, hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { sign } from "jsonwebtoken"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider"
import { AppError } from "@errors/AppError"

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute({ email, password }: IRequest) {

        if (email?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (password?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        const emailLowerCase = email.toLowerCase()

        const isValidEmail = this.validateProvider.ValidateEmail(emailLowerCase);

        if (isValidEmail === false) {
            throw new AppError("Email or password incorrect!");
        }

        const user = await this.usersRepository.findByEmail(emailLowerCase);

        if (!user) {
            throw new AppError("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, process.env.TOKEN, {
            subject: user.id,
            expiresIn: "1d"
        });


        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        };

        return tokenReturn

    }
}
export { AuthenticateUserUseCase };