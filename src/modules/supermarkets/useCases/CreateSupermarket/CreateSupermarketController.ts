import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSupermarketUseCase } from "./CreateSupermarketUseCase";

class CreateSupermarketController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { name } = request.body;

        const createSupermarketUseCase = container.resolve(CreateSupermarketUseCase);

        const supermarket = await createSupermarketUseCase.execute({ name });

        return response.status(201).json(supermarket);
    }
}
export { CreateSupermarketController };