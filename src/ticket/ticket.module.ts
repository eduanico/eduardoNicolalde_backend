import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { UpdateDTO } from 'src/kafka/dto/updateDTO';

@Module({
  imports:[TypeOrmModule.forFeature([Ticket]), TypeOrmModule.forFeature([UpdateDTO])],
  providers: [TicketResolver, TicketService],
  exports: [TicketService]
})
export class TicketModule {}
