import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';

@Module({
  providers: [TicketResolver]
})
export class TicketModule {}
