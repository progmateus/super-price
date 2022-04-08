import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";


@Entity("products")
class Product {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    gtin: string;

    @Column()
    brand: string;

    @Column()
    thumbnail: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }

}
export { Product }