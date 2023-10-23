import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { UpdateDTO } from './dto/updateDto.dto';

@Controller('api')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  //ejercicio 2
  @MessagePattern('technical_support_tickets')
  updateStatus(@Payload() payload: UpdateDTO): any {
    return this.kafkaService.updateStatus(payload);
  }

  //ejercicio 2
  @Post('/status')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  public messageStatus(@Body() updateDto: UpdateDTO) {
    this.kafkaService.sendUpdateRequest(updateDto);
    return 'done';
  }
}
