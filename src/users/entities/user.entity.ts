import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RoleUserEnum from "../../common/enums/RoleUser.js";
import { Exclude } from 'class-transformer'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
