import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RoleUserEnum from "../../common/enums/RoleUser.js";
import { Exclude } from 'class-transformer'
import type { UUID } from "crypto";
import { Address } from "../../address/entities/address.entity.js";
import { Ticket } from "../../ticket/entities/ticket.entity.js";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    name: string;

    @Column({ unique: true })
    mobile: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: RoleUserEnum, default: RoleUserEnum.normalUser })
    role: string;

    @OneToMany(() => Address, (address) => { address.user })
    addresses: Address[];

    @OneToMany(() => Ticket, (ticket) => { ticket.user })
    tickets: Ticket[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
