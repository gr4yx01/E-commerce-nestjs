import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntityModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date
}