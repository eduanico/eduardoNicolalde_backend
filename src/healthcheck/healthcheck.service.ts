import { Injectable } from '@nestjs/common';
import { getAllStatus, getStatusById } from 'src/cockroach_db/status.service';
import { HealthcheckDTO } from './heatlhcheckDTO.class';

@Injectable()
export class HealthCheckService {
  getStates(): any {
    return getAllStatus();
  }
  getStateById(id: number): any {
    return getStatusById(id);
  }
}
