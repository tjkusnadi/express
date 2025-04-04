import closeWithGrace from 'close-with-grace';

import { postgresConnector } from './connectors';
import { createApp } from './app';
import { config } from './config';

const startServer = async (): Promise<void> => {
  const { app, pool, logger } = await createApp();
  const port = config.app.port;

  const server = app.listen(port, () => {
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
