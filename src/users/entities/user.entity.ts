import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RoleUserEnum from "../../common/enums/RoleUser.js";
import { Exclude } from 'class-transformer'
import type { UUID } from "crypto";

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

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
