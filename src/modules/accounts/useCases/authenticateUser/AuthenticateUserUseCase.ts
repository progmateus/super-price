import { compare, hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { sign } from "jsonwebtoken"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider"
import { AppError } from "@errors/AppError"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import auth from "@config/auth"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

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
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
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
        const {
            secret_refresh_token,
            secret_token,
            expires_in_token,
            expires_in_refresh_token,
            refresh_token_expires_days
        } = auth

        if (!user) {
            throw new AppError("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dateProvider.addDays(refresh_token_expires_days)


        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })


        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        };

        return tokenReturn

    }
}
export { AuthenticateUserUseCase };