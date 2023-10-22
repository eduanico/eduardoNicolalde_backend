import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { CategoryEnum } from './enums/category.enum';
import { StatusEnum } from './enums/status.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async createTicket(ticket: CreateTicketInput): Promise<Ticket> {
    const newTicket = await this.ticketRepository.create(ticket);

    let pathParam;
    switch (ticket.category) {
      case CategoryEnum.incident:
        pathParam = 1;
        break;
      case CategoryEnum.support:
        pathParam = 2;
        break;
      case CategoryEnum.error:
        pathParam = 3;
        break;
    }
    newTicket.status = StatusEnum.pending;
    return this.ticketRepository.save(newTicket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
}
