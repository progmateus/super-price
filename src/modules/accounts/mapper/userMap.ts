import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class userMap {
    static toDTO({
        id,
        name,
        lastname,
        email,
        avatar

    }: User): IUserResponseDTO {

        return {
            id,
            name,
            lastname,
            email,
            avatar
        }
    }
}

export { userMap };