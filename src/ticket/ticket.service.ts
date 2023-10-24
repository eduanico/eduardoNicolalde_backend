import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository, MoreThan } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { CategoryEnum } from './enums/category.enum';
import { StatusEnum } from './enums/status.enum';
import { TicketFilterDTO } from './dto/ticket-filter.dto';
import { UpdateDTO } from 'src/kafka/dto/updateDto.dto';
import { GraphQLError } from 'graphql';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async updateStatus(payload: UpdateDTO): Promise<any> {
    try {
      const updateRes = await this.ticketRepository.update(
        {
          id: payload.id,
        },
        {
          status: payload.status,
        },
      );
      console.log('respuesta del update: ', updateRes);
    } catch (err) {
      console.log(err);
    }
  }

  //Pending err handler when not found
  async findTicketById(id: string): Promise<any> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        id,
      },
    });
    console.log(ticket);
    if (ticket == null)
      throw new GraphQLError(
        'Ticket no encontrado con id: ' + id,
        {
          extensions: {
            code: 'TICKET_NOT_FOUND',
          },
        },
      );
    return ticket;
  }

  createTicket(ticket: CreateTicketInput): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(ticket);

    let pathParam;
    switch (ticket.category) {
      case CategoryEnum.INCIDENT:
        pathParam = 1;
        break;
      case CategoryEnum.SUPPORT:
        pathParam = 2;
        break;
      case CategoryEnum.ERROR:
        pathParam = 3;
        break;
    }
    console.log(pathParam);
    newTicket.status = StatusEnum.PENDING;
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
