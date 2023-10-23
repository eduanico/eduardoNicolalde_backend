import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['pkc-419q3.us-east4.gcp.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: '534TCTH6A4HXWOKN',
              password:
                'Dh3gY+CAcTdWPZlhIXirDsLHrzl4DSnnPaMA+NEN3d5sT8u6yJpuZFqc28VpfIeN',
            },
          },
        },
      },
    ]),
    TicketModule,
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
})
export class KafkaModule {}
