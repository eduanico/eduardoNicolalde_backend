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

    // CREATE the healthchecks table
    'CREATE TABLE healthcheck (id INT NOT NULL, state INT NULL)',
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
      let result = await client.query(statements[n]);
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
