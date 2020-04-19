const express = require('express');
const http = require('http');

const router = require('./router');
const logger = require('../../utils/logger');

const startServer = port => {
  const app = express();

  app.use(express.json());

  app.use('/api', router);

  const server = http.Server(app);

  return server.listen({ port }, () => {
    logger.info(`server listening on port ${port}`);
  });
};

module.exports = startServer;
