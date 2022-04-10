import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreatePriceUseCase } from "./CreatePriceUseCase";


class CreatePriceController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            product_id,
            supermarket_id,
            price } = request.body;

        const { id } = request.user;



        const createPriceUseCase = container.resolve(CreatePriceUseCase);

        await createPriceUseCase.execute({
            product_id,
            supermarket_id,
            user_id: id,
            price
        })

        return response.status(201).send();
    }
}
export { CreatePriceController }