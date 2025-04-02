import closeWithGrace from 'close-with-grace';
import express from 'express';
import pinoHttp from 'pino-http';

import { 
  config
}  from './config';
import {
  logger
} from './config/logger';
import routes from './routes';

const startServer: () => void = () => {
  const app = express();
  const port = config.app.port;
    
  app.use(express.json());
  app.use(pinoHttp({
    logger,
    autoLogging: true
  }));
  app.use('', routes);
  const server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  closeWithGrace(async ({ signal, err }) => {
    logger.warn(`🛑 Received ${signal}, shutting down...`);
  
    if (err) {
      logger.error('Unhandled error before shutdown', err);
    }
  
    await new Promise((resolve) => server.close(resolve)); 
  
    logger.info('✅ Server shut down successfully.');
  });
};



export default startServer;