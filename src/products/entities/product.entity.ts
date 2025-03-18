import { Order } from "src/orders/entity/orders.entity";
import { Review } from "src/reviews/entities/review.model";
import { BaseEntityModel } from "src/shared/base-model.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('products')
export class Product extends BaseEntityModel {
    @Column('text')
    name: string

    @Column('text')
    description: string

    @Column('decimal', { default: 0.0 })
    price: number

    @Column('text', { default: 'image.png' })
    image: string

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[]

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[]

    @Column('simple-json', {
        default: {},
        comment: 'A key-value pair that represent the product specification'
    })
    specs: Record<string, string>
}