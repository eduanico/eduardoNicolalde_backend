import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  createTicket(ticket: Ticket): void {
    this.ticketRepository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
}
