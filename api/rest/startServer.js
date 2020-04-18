import express from 'express';
import http from 'http';

import router from './router';
import logger from '../../utils/logger';

const startServer = port => {
  const app = express();

  app.use(express.json());

  app.use('/', router);

  app.listen(port, () => {
    logger.info(`server listening on port ${port}`);
  });

  return http.Server(app);
};

export default startServer;
