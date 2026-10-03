import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity.js';
import { User } from '../users/entities/user.entity.js';
import { ERROR_MESSAGES } from '../common/constants/messages.js';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

  ) { }

  async create(createTicketDto: CreateTicketDto, user: User) {
    const { replyTo, ...ticketinfo } = createTicketDto;
    let replyToTicket;

    if (replyTo) {
      replyToTicket = await this.ticketRepo.findOneOrFail({ where: { id: replyTo }, relations: { replyTo: true } });
      if (replyToTicket.replyTo) {
        throw ERROR_MESSAGES.TICKETS.conflict;
      }
    }

    const newTicket = this.ticketRepo.create(
      {
        ...ticketinfo,
        user,
        replyTo: replyToTicket
      }
    );
    return this.ticketRepo.save(newTicket);
  }

  async findAll() {
    const tickets = await this.ticketRepo.createQueryBuilder('ticket')
      .where('ticket.replyToId IS NULL')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.replies', 'replies')
      .getMany()

    return tickets;
  }

  async findOne(id: UUID) {
    const ticket = await this.ticketRepo.findOne({ where: { id }, relations: { user: true, replies: true, replyTo: true } });
    if (!ticket) {
      throw ERROR_MESSAGES.TICKETS.notFound;
     }
    return ticket;
  }
}
