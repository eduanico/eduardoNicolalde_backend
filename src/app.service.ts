import { Injectable } from '@nestjs/common';
import { initDb } from './cockroach_db/initdatabase.service';

@Injectable()
export class AppService {
  getHello(): string {
    initDb;
    return 'Hello aaron!';
  }

}
