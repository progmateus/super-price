import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPriceUseCase } from "./FindPriceUseCase";

class FindPriceController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { supermarket_name, gtin } = request.query;

        const findPriceUseCase = container.resolve(FindPriceUseCase);

        const prices = await findPriceUseCase.execute({
            supermarket_name: supermarket_name as string,
            gtin: gtin as string
        })
        return response.json(prices);

    }
}
export { FindPriceController };