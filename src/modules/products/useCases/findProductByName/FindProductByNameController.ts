import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProductByNameUseCase } from "./FindProductByNameUseCase";


class FindProductByNameController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.query

        const findProductByNameUseCase = container.resolve(FindProductByNameUseCase)

        const product = await findProductByNameUseCase.execute(name as string);

        return response.json(product)
    }


}
export { FindProductByNameController }