import { Order } from "src/orders/entity/orders.entity";
import { BaseEntityModel } from "src/shared/base-model.entity";
import { Column, Entity, OneToMany } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MERCHANT = 'merchant'
}

@Entity('users')
export class User extends BaseEntityModel {
    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[]

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole
}