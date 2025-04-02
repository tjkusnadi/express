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
    logger.info(config, 'config');
    await pool.connect();

    logger.info('Connected to PostgreSQL!');

    return pool;
  } catch (e) {
    logger.error('Failed to connect to PostgreSQL', e);
    throw e;
  }
};

export const disconnect = async (
  pool: Pool,
  logger: Logger
) => {
  try {
    await pool.end();
    logger.info('Disconnected from PostgreSQL');
    return;
  } catch (e) {
    logger.error('Failed to disconnect from PostgreSQL', e);
  }
};