import { Request, Response } from "express"
import { container } from "tsyringe";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";


class FindUserByEmailController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.query;

        const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCase)

        const user = await findUserByEmailUseCase.execute(email as string);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).send();
    }
}
export { FindUserByEmailController }