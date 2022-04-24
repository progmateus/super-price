import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";


interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<String> {

        const { sub } = verify(token, process.env.SECRET_REFRESH_TOKEN) as IPayload

        const user_id = sub

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokenRepository.deleteById(userToken.id)

        const refresh_token = sign({}, process.env.SECRET_REFRESH_TOKEN, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = this.dateProvider.addDays(auth.refresh_token_expires_days)

        await this.usersTokenRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        return refresh_token
    }

}



export { RefreshTokenUseCase };