import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import closeWithGrace from 'close-with-grace';

import {
  postgresConnector
} from './connectors';

import { createRequestLogger } from './middlewares/requestLogger';
 
import { 
  config
}  from './config';
import routes from './routes';

const logger = pino({
  ...config.logger,
  redact: {
    paths: ['password'],
    censor: '[REDACTED]'
  },
});


const startServer = async (): Promise<void> => {
  const app = express();
  const port = config.app.port;

  const pool = await postgresConnector.connect({
    ...config.postgres
  }, logger);
  app.use(express.json());
  app.use(pinoHttp({
    logger,
    autoLogging: true
  }));

  const requestLogger = createRequestLogger(pool);
  app.use(requestLogger);
  app.use('', routes);

  await postgresConnector.runMigrations(pool, logger);

  const server = app.listen(port, async () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  closeWithGrace(async ({ signal, err }) => {
    logger.warn(`🛑 Received ${signal}, shutting down...`);
  
    if (err) {
      logger.error('Unhandled error before shutdown', err);
    }

    await postgresConnector.disconnect(pool, logger);

    try {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
      
      logger.info('✅ Server shut down successfully.');
    } catch (shutdownError) {
      logger.error('Error during shutdown:', shutdownError);
      process.exit(1);
    }
  });
};



export default startServer;