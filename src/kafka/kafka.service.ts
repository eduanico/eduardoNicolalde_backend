import { Injectable } from '@nestjs/common';
import { UpdateDTO } from './dto/updateDto.dto';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class KafkaService {
  constructor(private readonly ticketService: TicketService) {}

  updateStatus(payload: UpdateDTO): any {
    return this.ticketService.updateStatus(payload);
  }
}
