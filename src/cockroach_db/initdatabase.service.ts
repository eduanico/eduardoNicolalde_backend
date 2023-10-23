import { Client } from 'pg';
require('dotenv').config();

export const initDb = (async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    application_name: '$ eduanico_app',
  });
  const statements = [
    // Clear any existing data
    'DROP TABLE IF EXISTS healthcheck',
    'DROP TABLE IF EXISTS ticket',
    'DROP TABLE IF EXISTS data',
    // CREATE the healthchecks table
    'CREATE TABLE healthcheck (id INT8 NOT NULL, state INT NULL), CONSTRAINT "PK_2533602bd9247937e3a4861e174" PRIMARY KEY (id ASC))',
    // 'CREATE TABLE public.data (id INT8 NOT NULL DEFAULT unique_rowid(),balance FLOAT8 NOT NULL,account banco_pichincha.public.data_account_enum NOT NULL,description VARCHAR NOT NULL,status banco_pichincha.public.data_status_enum NOT NULL,date TIMESTAMP NOT NULL,CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY (id ASC))',
    // INSERT a row into the healthchecks table
    'INSERT INTO healthcheck (id, state) VALUES (1,604)',
    'INSERT INTO healthcheck (id, state) VALUES (2,606)',
    'INSERT INTO healthcheck (id, state) VALUES (3,607)',
    // SELECT a row from the healthchecks table
    'SELECT * FROM healthcheck',
  ];

  try {
    // Connect to CockroachDB
    await client.connect();
    for (let n = 0; n < statements.length; n++) {
      const result = await client.query(statements[n]);
      if (result.rows[0]) {
        console.log(result.rows[0]);
        console.log(result.rows[1]);
        console.log(result.rows[2]);
      }
    }
    await client.end();
    return;
  } catch (err) {
    console.log(`error connecting: ${err}`);
  }
})().catch((err) => console.log(err.stack));
