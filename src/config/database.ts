import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const dbConfig = {
  client: 'pg',
  connection: {
    // host: 'localhost',
    // port: 5432,
    // database: 'bookstoredb',
    // user: 'postgres',
    // password: 'rafsan@1234',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
};

const db = knex(dbConfig);

export default db;
