import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { userMap } from "@modules/accounts/mapper/userMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<IUserResponseDTO> {

        const user = await this.usersRepository.findById(id);

        return userMap.toDTO(user);
    }

}
export { ProfileUserUseCase };