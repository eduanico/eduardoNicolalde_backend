import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TicketModule],
  controllers: [KafkaController],
  providers: [KafkaService],
})
export class KafkaModule {}
