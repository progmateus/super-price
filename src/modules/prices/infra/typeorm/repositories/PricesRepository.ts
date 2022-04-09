import { ICreatePriceDTO } from "@modules/prices/dtos/ICreatePriceDTO";
import { IPricesRepository } from "@modules/prices/repositories/IPricesRepository";
import { getRepository, Repository } from "typeorm";
import { Price } from "../entities/Price";

class PricesRepository implements IPricesRepository {
    private repository: Repository<Price>

    constructor() {
        this.repository = getRepository(Price);
    }


    async create({
        id,
        product_id,
        supermarket_id,
        user_id,
        price
    }: ICreatePriceDTO): Promise<void> {
        const value = this.repository.create({
            id,
            product_id,
            supermarket_id,
            user_id,
            price
        })

        await this.repository.save(value);
    }
    async findById(id: string): Promise<Price> {
        const price = await this.repository.findOne(id)
        return price
    }


    async findBySupermarketId(supermarket_id: string): Promise<Price[]> {
        const price = await this.repository.find({ supermarket_id })
        return price
    }


    async findByProductId(product_id: string): Promise<Price[]> {
        const price = await this.repository.find({ product_id })
        return price
    }


    async findByUserId(user_id: string): Promise<Price[]> {
        const price = await this.repository.find({ user_id })
        return price
    }

}
export { PricesRepository };