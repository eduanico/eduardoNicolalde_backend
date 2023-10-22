import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TicketModule } from './ticket/ticket.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { TypeOrmModule } from '@nestjs/typeorm';
require('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
       ApolloServerPluginLandingPageLocalDefault()
      ]
    }),
    TypeOrmModule.forRoot({
      port:26257,
      type:"postgres",
      url: process.env.DATABASE_URL,
      entities:[__dirname + "/**/*.entity{.ts,.js}"],
      // synchronize:true
    }),
    TicketModule,
    HealthCheckModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
