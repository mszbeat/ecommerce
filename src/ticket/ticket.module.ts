import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service.js';
import { TicketController } from './ticket.controller.js';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
