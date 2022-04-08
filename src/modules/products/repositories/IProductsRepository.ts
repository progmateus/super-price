import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {

    create(data: ICreateProductDTO): Promise<void>;
    findById(id: string): Promise<Product>;
    findByGtin(gtin: string): Promise<Product>;
    ///findByName(name: string): Promise<Product[]>;

}
export { IProductsRepository };