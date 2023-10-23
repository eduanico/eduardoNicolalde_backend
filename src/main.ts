import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: 'kafka-controller',
      },
      client: {
        brokers: ['pkc-419q3.us-east4.gcp.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: '534TCTH6A4HXWOKN',
          password:
            'Dh3gY+CAcTdWPZlhIXirDsLHrzl4DSnnPaMA+NEN3d5sT8u6yJpuZFqc28VpfIeN',
        },
        connectionTimeout: 45000,
      },
    },
  } as MicroserviceOptions);
  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription('APIs for banco pichincha test')
    .setVersion('1.0')
    .addTag('Banco Pichincha API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
