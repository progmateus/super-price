import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, lastname, email, password } = request.body;
        const { id } = request.user

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        await updateUserUseCase.execute({
            id,
            name,
            lastname,
            email,
            password,
        })

        return response.status(200).send();
    }
}
export { UpdateUserController };