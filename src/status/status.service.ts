import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { StatusDTO } from 'src/status/status.class';
require('dotenv').config();

@Injectable()
export class StatusService {
  getAllStatus = async () => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: '$ eduanico_app',
    });
    try {
      await client.connect();
      let result = await client.query('SELECT * FROM healthcheck').then((res) => {
        let array = new Array<StatusDTO>();
        for (let n = 0; n < res.rows.length; n++) {
          let healthcheckDTO = new StatusDTO();
          healthcheckDTO.id = parseInt(res.rows[n].id);
          healthcheckDTO.status = parseInt(res.rows[n].state);
          array.push(healthcheckDTO);
        }
        return array;
      });
      await client.end();
  
      return result;
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }
  };
  getStatusById = async (id: number) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: '$ eduanico_app',
    });
    let statusDTO = new StatusDTO();
  
    try {
      await client.connect();
      let result = await client
        .query('SELECT * FROM healthcheck WHERE id = ' + id)
        .then((res) => {
          if(res.rows[0]) {
            statusDTO.id = id;
            statusDTO.status = parseInt(res.rows[0].state);
            return statusDTO;
          }
          statusDTO.id = id;
          statusDTO.status = 607;
          return statusDTO;
        });
      await client.end();
      return result;
    } catch (err) {
      console.log(`error connecting: ${err}`);
      statusDTO.id = id;
      statusDTO.status = 607;
      return statusDTO;
    }
  };
}
