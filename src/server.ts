import closeWithGrace from 'close-with-grace';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

import {
  postgresConnector
} from './connectors';
 
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
    
  app.use(express.json());
  app.use(pinoHttp({
    logger,
    autoLogging: true
  }));
  app.use('', routes);

  const pool = await postgresConnector.connect({
    ...config.postgres
  }, logger);

  const server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  closeWithGrace({ 
    delay: 500,
  }, async ({ signal, err }) => {
    logger.warn(`🛑 Received ${signal}, shutting down...`);
  
    if (err) {
      logger.error('Unhandled error before shutdown', err);
    }

    try {
      await postgresConnector.disconnect(pool, logger);
    
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