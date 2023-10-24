import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { TicketFilterDTO } from './dto/ticket-filter.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Resolver()
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => [Ticket])
  findAll() {
    return this.ticketService.findAll();
  }

  //ejercicio 2
  @Mutation(() => Ticket)
  createPost(@Args('ticketInput') ticketInput: CreateTicketInput) {
    return this.ticketService.createTicket(ticketInput);
  }

  //ejercicio 3
  @Query(()=> Ticket)
  async findTicket(@Args('id', { type: () => String }) id: string) {
      return await this.ticketService.findTicketById(id);
  }

  //ejercicio 4
  @Query(() => [Ticket])
  searchTickets(@Args('args') args: TicketFilterDTO) {
    return this.ticketService.findByFilters(args);
  }
}
