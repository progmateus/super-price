import { ICreatePriceDTO } from "@modules/prices/dtos/ICreatePriceDTO";
import { Price } from "@modules/prices/infra/typeorm/entities/Price";
import { IPricesRepository } from "../IPricesRepository";


class PricesRepositoryInMemory implements IPricesRepository {

    prices: Price[] = []

    async create({
        product_id,
        supermarket_id,
        user_id,
        price,
    }: ICreatePriceDTO): Promise<Price> {
        const value = new Price();

        Object.assign(value, {
            product_id,
            supermarket_id,
            user_id,
            price,
        })

        this.prices.push(value);

        return value;

    }
    async findById(id: string): Promise<Price> {
        const price = this.prices.find(price => price.id === id)
        return price
    }
    async findBySupermarketId(supermarket_id: string): Promise<Price[]> {
        const prices = this.prices.filter(price => price.supermarket_id === supermarket_id)
        return prices
    }
    async findByProductId(product_id: string): Promise<Price[]> {
        const prices = this.prices.filter(price => price.product_id === product_id)
        return prices
    }
    async findByUserId(user_id: string): Promise<Price[]> {
        const prices = this.prices.filter(price => price.user_id === user_id)
        return prices
    }
    async findPrice(supermarket_id?: string, product_id?: string): Promise<Price[]> {

        const prices = await this.prices.filter((price) => {
            if (
                (supermarket_id && price.supermarket_id === supermarket_id) ||
                (product_id && price.product_id === product_id)
            ) {
                return prices
            }

            return null;
        });

        return prices;
    }

}
export { PricesRepositoryInMemory };