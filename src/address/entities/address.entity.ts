import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import type { UUID } from "crypto";
import { User } from "../../users/entities/user.entity.js";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ nullable: false })
    privince: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    address: string;

    @Column({ length: 10 })
    postal_code: string;

    @Column({ length: 11 })
    reciver_mobile: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => { user.addresses })
    user: Relation<User>;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
