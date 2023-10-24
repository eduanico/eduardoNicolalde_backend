import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
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
  ],
  providers: [TicketResolver, TicketService],
  exports: [TicketService],
})
export class TicketModule {}
