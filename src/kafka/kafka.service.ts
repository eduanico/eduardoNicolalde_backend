import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateDTO } from './dto/updateDto.dto';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
    private readonly ticketService: TicketService,
  ) {}
  sendUpdateRequest(updateDto: UpdateDTO) {
    return this.kafka.emit('technical_support_tickets', {
      updateDto,
    });
  }
  updateStatus(payload: UpdateDTO): any {
    return this.ticketService.updateStatus(payload);
  }
}
