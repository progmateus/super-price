import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindPriceByGtinUseCase } from "./FindPriceByGtinUseCase"


class FindPriceByGtinController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { gtin } = request.params;

        const findPriceByGtinUseCase = container.resolve(FindPriceByGtinUseCase);
        const price = await findPriceByGtinUseCase.execute(gtin)

        return response.json(price);
    }
}
export { FindPriceByGtinController }