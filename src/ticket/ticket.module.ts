import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service.js';
import { TicketController } from './ticket.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ticket]),
    UsersModule
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
