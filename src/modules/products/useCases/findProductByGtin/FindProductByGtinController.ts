import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProductByGtinUseCase } from "./FindProductByGtinUseCase";


class FindProductByGtinController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { gtin } = request.params
        const findProductByGtinUseCase = container.resolve(FindProductByGtinUseCase)

        const product = await findProductByGtinUseCase.execute(gtin);

        return response.json(product)
    }


}
export { FindProductByGtinController }