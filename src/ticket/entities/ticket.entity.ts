import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { UUID } from "crypto";
import { User } from "../../users/entities/user.entity.js";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ nullable: false })
    title: string;

    @ManyToOne(() => User, (user) => { user.tickets })
    user: User;

    @Column({ nullable: false })
    subject: string;

    @Column({ nullable: false })
    description: string;

    @ManyToOne(() => Ticket, (ticket) => { ticket.replies }, { nullable: true })
    replyTo: Ticket;

    @OneToMany(() => Ticket, (ticket) => { ticket.replyTo }, { nullable: true })
    replies: Ticket[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
