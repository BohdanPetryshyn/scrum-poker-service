const express = require('express');
const http = require('http');

const router = require('./router');
const logger = require('../../utils/logger');

const startServer = port => {
  const app = express();

  app.use(express.json());

  app.use('/', router);

  app.listen(port, () => {
    logger.info(`server listening on port ${port}`);
  });

  return http.Server(app);
};

module.exports = startServer;
