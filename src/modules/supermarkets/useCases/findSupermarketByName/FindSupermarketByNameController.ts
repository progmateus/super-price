import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSupermarketByNameUseCase } from "./FindSupermarketByNameUseCase";


class FindSupermarketByNameController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.query;

        const findSupermarketByNameUseCase = container.resolve(FindSupermarketByNameUseCase);

        const supermarket = await findSupermarketByNameUseCase.execute(
            name as string
        );

        return response.json(supermarket);
    }

}
export { FindSupermarketByNameController }