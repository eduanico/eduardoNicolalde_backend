import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository, MoreThan } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { CategoryEnum } from './enums/category.enum';
import { StatusEnum } from './enums/status.enum';
import { TicketFilterDTO } from './dto/ticket-filter.dto';
import { UpdateDTO } from 'src/kafka/dto/updateDto.dto';
import { GraphQLError } from 'graphql';
import { HttpService } from '@nestjs/axios';
import { StatusDTO } from 'src/status/status.class';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateStatusDTO } from 'src/kafka/dto/updateStatus.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
    private readonly httpService: HttpService,
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
      throw new GraphQLError('Ticket no encontrado con id: ' + id, {
        extensions: {
          code: 'TICKET_NOT_FOUND',
        },
      });
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
    const data = this.updateTicketKafka(pathParam);
    data.then((statusDto) => {
      console.log(statusDto);
      this.sendUpdateRequest({
        id: newTicket.id,
        status: statusDto.status,
      });
    });
    return this.ticketRepository.save(newTicket);
  }

  sendUpdateRequest(updateStatus: UpdateStatusDTO) {
    let ticketStatus = 'pending';
    switch (updateStatus.status) {
      case 604:
        ticketStatus = 'verified';
        break;
      case 606:
        ticketStatus = 'approved';
        break;
      case 607:
        ticketStatus = 'rejected';
        break;
    }
    console.log('sending kafka...', updateStatus.id, ticketStatus);
    return this.kafka.emit('technical_support_tickets', {
      id: updateStatus.id,
      status: ticketStatus,
    });
  }

  async updateTicketKafka(pathParam: number) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<StatusDTO>('http://localhost:3000/api/status/' + pathParam)
        .pipe(
          catchError(() => {
            throw 'An error happened!';
          }),
        ),
    );
    return data;
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
