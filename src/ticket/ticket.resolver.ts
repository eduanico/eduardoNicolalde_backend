import { Args, Parent, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { Body } from '@nestjs/common';

@Resolver()
export class TicketResolver {
    constructor(private readonly ticketService: TicketService) {}

  @Query(() => String, { description: 'Hola mundo', name: 'hello_world' })
  helloWorld(): string {
    return 'Hola mundo';
  }
  @Query(() => String, { description: 'Hola to (name)', name: 'hello_to' })
  helloTo(
    @Args('to', { nullable: true, type: () => String }) to: string = 'default',
  ): string {
    return 'Hola ' + to;
  }

  @Query(() => [Ticket])
  findAll() {
    return this.ticketService.findAll();
  }

  @Query(()=> Ticket)
  createTicket(
    @Parent() ticket: Ticket
    // @Body('ticket', { nullable: false, type: () => Ticket }) ticket: Ticket,
  ) {
    this.ticketService.createTicket(ticket);
  }
}
