import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  },
  postgres: {
    user: process.env.PG_USER || 'user',
    host: process.env.PG_HOST || 'host',
    database: process.env.PG_DATABASE || 'db',
    password: process.env.PG_PASSWORD || 'password',
    port: Number(process.env.PG_PORT) || 5432,
    ssl: process.env.PG_SSL === 'true' ?
    { rejectUnauthorized: false } as { rejectUnauthorized: boolean } :
      false
  }
};