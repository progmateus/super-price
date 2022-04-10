import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSupermarketsUseCase } from "./ListSupermarketsUseCase";


class ListSupermarketsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listSupermarketsUseCase = container.resolve(ListSupermarketsUseCase);

        const supermarkets = await listSupermarketsUseCase.execute();

        return response.json(supermarkets)
    }

}
export { ListSupermarketsController };