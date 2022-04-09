import { v4 as uuidV4 } from "uuid"
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Supermarket } from "@modules/supermarkets/infra/typeorm/entities/Supermarket";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("prices")
class Price {

    @PrimaryColumn()
    id: string;

    @ManyToMany(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product

    @ManyToMany(() => Supermarket)
    @JoinColumn({ name: "supermarket_id" })
    supermarket: Supermarket

    @ManyToMany(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    product_id: string;

    @Column()
    supermarket_id: string;

    @Column()
    user_id: string;

    @Column()
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}
export { Price };