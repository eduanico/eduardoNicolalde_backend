import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { UpdateDTO } from './dto/updateDto.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('status')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  //ejercicio 2
  @MessagePattern('technical_support_tickets')
  updateStatus(@Payload() payload: UpdateDTO): any {
    return this.kafkaService.updateStatus(payload);
  }
}
