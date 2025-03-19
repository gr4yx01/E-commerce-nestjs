import { Product } from "src/products/entities/product.entity";
import { BaseEntityModel } from "src/shared/base-model.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

export enum OrderStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    CANCELLED = 'CANCELLED'
}

@Entity('orders')
export class Order extends BaseEntityModel{
    @Column()
    quantity: number

    @Column({ default: OrderStatus.PENDING })
    status: OrderStatus

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    totalPrice: number

    @ManyToOne(() => User, (user) => user.orders)
    customer: User

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product
}