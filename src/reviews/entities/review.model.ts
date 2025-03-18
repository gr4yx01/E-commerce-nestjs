import { Product } from "src/products/entities/product.entity";
import { BaseEntityModel } from "src/shared/base-model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('reviews')
export class Review extends BaseEntityModel {
    @Column()
    content: string

    @Column('float', { default: 0.0 })
    rating: number

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product
}