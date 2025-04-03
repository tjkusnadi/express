import { Pool } from 'pg';
import { Logger } from 'pino';

export const connect = async (
  config: {
        user: string,
        host: string,
        database: string,
        password: string,
        port: number
    },
  logger: Logger,
) => {
  const pool = new Pool(config);

  try {
    const client = await pool.connect();
    logger.info('Connected to PostgreSQL!');
    client.release();
  } catch (e) {
    logger.error('Failed to connect to PostgreSQL', e);
    throw e;
  }

  return pool;
};

export const disconnect = async (
  pool: Pool,
  logger: Logger
) => {
  try {
    await pool.end();
    logger.info('Disconnected from PostgreSQL');
  } catch (e) {
    logger.error('Failed to disconnect from PostgreSQL', e);
  }
};

export const runMigrations = async (
  pool: Pool,
  logger: Logger
) => {
  try {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS request_logs (
                id SERIAL PRIMARY KEY,
                method VARCHAR(10) NOT NULL,
                path VARCHAR(255) NOT NULL,
                status INTEGER NOT NULL,
                timestamp TIMESTAMP NOT NULL,
                response_time INT,
                ip VARCHAR(45),
                user_agent TEXT
            )
        `;
    await pool.query(createTableQuery);
    logger.info('Migrations completed successfully');
  } catch (e) {
    logger.error('Error running migrations', e);
    throw e;
  }
};