// src/app.ts
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { postgresConnector } from './connectors';
import { config } from './config';
import routes from './routes';
import { createRequestLogger } from './middlewares/requestLogger';

export const createApp = async () => {
  const app = express();

  const logger = pino({
    ...config.logger,
    redact: {
      paths: ['password'],
      censor: '[REDACTED]'
    },
  });

  const pool = await postgresConnector.connect(config.postgres, logger);
  await postgresConnector.runMigrations(pool, logger);

  app.use(express.json());
  app.use(pinoHttp({ logger, autoLogging: true }));
  app.use(createRequestLogger(pool));
  app.use('', routes);

  return { app, pool, logger };
};
