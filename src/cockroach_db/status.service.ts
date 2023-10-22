import { Client } from 'pg';
import { HealthcheckDTO } from 'src/healthcheck/heatlhcheckDTO.class';
require('dotenv').config();

export const getAllStatus = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    application_name: '$ eduanico_app',
  });
  try {
    await client.connect();
    let result = await client.query('SELECT * FROM healthcheck').then((res) => {
      let array = new Array<HealthcheckDTO>();
      for (let n = 0; n < res.rows.length; n++) {
        let healthcheckDTO = new HealthcheckDTO();
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

export const getStatusById = async (id: number) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    application_name: '$ eduanico_app',
  });
  let healthcheckDTO = new HealthcheckDTO();

  try {
    await client.connect();
    let result = await client
      .query('SELECT * FROM healthcheck WHERE id = ' + id)
      .then((res) => {
        if(res.rows[0]) {
          healthcheckDTO.id = id;
          healthcheckDTO.status = parseInt(res.rows[0].state);
          return healthcheckDTO;
        }
        healthcheckDTO.id = id;
        healthcheckDTO.status = 607;
        return healthcheckDTO;
      });
    await client.end();
    return result;
  } catch (err) {
    console.log(`error connecting: ${err}`);
    healthcheckDTO.id = id;
    healthcheckDTO.status = 607;
    return healthcheckDTO;
  }
};
