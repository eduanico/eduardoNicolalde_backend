import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';

@Resolver()
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => [Ticket])
  findAll() {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket)
  findTicketById(@Args('id', { type: () => String }) id: string) {
    return this.ticketService.findTicketById(id);
  }

  @Mutation(() => Ticket)
  createPost(@Args('ticketInput') ticketInput: CreateTicketInput) {
    return this.ticketService.createTicket(ticketInput);
  }
}
