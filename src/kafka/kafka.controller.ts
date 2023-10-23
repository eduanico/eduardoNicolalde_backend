import { Body, Controller, Inject, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusEnum } from 'src/ticket/enums/status.enum';
import { KafkaService } from './kafka.service';
import { UpdateDTO } from './dto/updateDTO';
import { Args } from '@nestjs/graphql';
import { TicketService } from 'src/ticket/ticket.service';
import { type } from 'os';

@Controller('api')
export class KafkaController {
  constructor(
    private readonly kafkaService: KafkaService    
    ) {}

    //ejercicio 2
  @MessagePattern('technical_support_tickets')
  updateStatus(@Payload() @Body() updateDto: UpdateDTO): any {
    console.log(updateDto);
    return this.kafkaService.updateStatus(updateDto);
  }

  //ejercicio 2
  @Post('/status')
  @UsePipes(new ValidationPipe({skipMissingProperties: true}))
  @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
  public messageStatus(@Body() updateDto: UpdateDTO) {
    this.kafkaService.sendUpdateRequest(updateDto);
    return 'done';
  }
}
