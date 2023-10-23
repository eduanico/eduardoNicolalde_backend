import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("status")
@Controller('/api/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('')
  async getAllStatus(): Promise<any> {
    return this.statusService.getAllStatus();
  }

  @Get('/:id')
  async getStatusWithId(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    return this.statusService.getStatusById(id);
  }
}
