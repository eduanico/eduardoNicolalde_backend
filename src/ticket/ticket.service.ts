import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { CategoryEnum } from './enums/category.enum';
import { StatusEnum } from './enums/status.enum';
import { UpdateDTO } from 'src/kafka/dto/updateDTO';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

   async updateStatus(updateDTO: UpdateDTO): Promise<any> {
    try {
      const updateRes = await this.ticketRepository.update({
        id: updateDTO.id
      },{
        status: updateDTO.status
      })
      console.log('respuesta del update: ', updateRes);
    } catch (err) {
      console.log(err);
    }
  }

  async findTicketById(id: string) {
    return await this.ticketRepository.findOne({
      where: {
        id,
      },
    });
  }

  createTicket(ticket: CreateTicketInput): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(ticket);

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
