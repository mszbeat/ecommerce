import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import type { UUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard.js';
import { RESPONSE_MESSAGES } from '../common/constants/messages.js';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Req() req: any) {
    const result = await this.ticketService.create(createTicketDto, req.user);
    return RESPONSE_MESSAGES.TICKETS.create(result)
  }

  @Get()
  async findAll() {
    const result = await this.ticketService.findAll();
    return RESPONSE_MESSAGES.TICKETS.findAll(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    const result = await this.ticketService.findOne(id);
    return RESPONSE_MESSAGES.TICKETS.findOne(result)
  }
}
