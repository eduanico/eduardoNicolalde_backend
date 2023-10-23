import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository, MoreThan } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { CategoryEnum } from './enums/category.enum';
import { StatusEnum } from './enums/status.enum';
import { UpdateDTO } from 'src/kafka/dto/updateDTO';
import { TicketFilterDTO } from './dto/ticket-filter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async updateStatus(updateDTO: UpdateDTO): Promise<any> {
    try {
      const updateRes = await this.ticketRepository.update(
        {
          id: updateDTO.id,
        },
        {
          status: updateDTO.status,
        },
      );
      console.log('respuesta del update: ', updateRes);
    } catch (err) {
      console.log(err);
    }
  }

  //Pending err handler when not found
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
    //send pathparam to api-fake

    return this.ticketRepository.save(newTicket);
  }

  //Pending err handler
  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  //Pending err handler
  findByFilters(args: TicketFilterDTO) {
    const query = this.ticketRepository.createQueryBuilder();
    if (args.category) query.where({ category: args.category });
    if (args.priority) query.where({ priority: args.priority });
    if (args.status) query.where({ status: args.status });
    if (args.start) query.where({ createdAt: MoreThan(args.start) });
    if (args.end) query.where({ createdAt: LessThan(args.end) });

    query.skip(args.skip);
    query.take(args.limit);
    return query.getMany();
  }
}
