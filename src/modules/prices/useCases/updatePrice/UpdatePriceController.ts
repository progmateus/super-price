import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePriceUseCase } from "./UpdatePriceUseCase";

class UpdatePriceController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { price_id, price } = request.body;
        const { id } = request.user

        const updatePriceUseCase = container.resolve(UpdatePriceUseCase);

        const prices = await updatePriceUseCase.execute({
            price_id,
            user_id: id,
            value: price
        })
        return response.json(prices);

    }
}
export { UpdatePriceController };