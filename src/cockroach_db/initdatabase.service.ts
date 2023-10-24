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
    'CREATE TABLE public.healthcheck (id INT8 NOT NULL,state INT8 NULL,rowid INT8 NOT VISIBLE NOT NULL DEFAULT unique_rowid(),CONSTRAINT healthcheck_pkey PRIMARY KEY (rowid ASC))',

    //CREATE DATA TABLE
    'CREATE TABLE public.data (id INT8 NOT NULL DEFAULT unique_rowid(),balance FLOAT8 NOT NULL,account VARCHAR NOT NULL,description VARCHAR NOT NULL, status VARCHAR NOT NULL,date TIMESTAMP NOT NULL,CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY (id ASC))',

    // CREATE TICKET TABLE
    'CREATE TABLE public.ticket (id INT8 NOT NULL DEFAULT unique_rowid(),title VARCHAR NOT NULL,description VARCHAR NOT NULL,priority VARCHAR NOT NULL,category VARCHAR NOT NULL,status VARCHAR NOT NULL,"createdAt" TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY (id ASC))',
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
