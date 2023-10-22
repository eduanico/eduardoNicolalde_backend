import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HealthCheckService } from './healthcheck.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("health")
@Controller('/api/management/health')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('')
  async getHealth(): Promise<any> {
    return this.healthCheckService.getStates();
  }

  @Get('/:id')
  async getHealthWithId(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    return this.healthCheckService.getStateById(id);
  }
}
