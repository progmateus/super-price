import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IPricesRepository } from "@modules/prices/repositories/IPricesRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    price_id: string;
    value: number;
    user_id: string;
}

@injectable()
class UpdatePriceUseCase {

    constructor(
        @inject("PricesRepository")
        private pricesRepository: IPricesRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute({ price_id, value, user_id }: IRequest) {

        if (price_id.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (user_id.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (typeof value !== "number") {
            throw new AppError("Invalid price!", 400)
        }

        if (await this.validateProvider.uuidValidateV4(price_id) === false) {
            throw new AppError("Invalid price uuid")
        }

        if (await this.validateProvider.uuidValidateV4(user_id) === false) {
            throw new AppError("Invalid user uuid")
        }

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 404)
        }

        const price = await this.pricesRepository.findById(price_id);

        if (!price) {
            throw new AppError("Price does not exists", 404);
        }

        price.price = Number(value.toFixed(2));
        price.user_id = user_id

        const priceUpdated = await this.pricesRepository.create(price);

        return priceUpdated

    }

}
export { UpdatePriceUseCase };