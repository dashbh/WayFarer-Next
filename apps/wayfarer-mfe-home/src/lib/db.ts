import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wayfarerdb',
  password: 'postgres', // ideally use process.env.DB_PASSWORD
  port: 5432,
});