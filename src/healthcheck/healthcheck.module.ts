import { Module } from "@nestjs/common";
import { HealthCheckController } from "./healthcheck.controller";
import { HealthCheckService } from "./healthcheck.service";

@Module({
    imports: [],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
  })
  export class HealthCheckModule {}