const io = require('socket.io');
const logger = require('../../utils/logger');

const createSessionHandler = require('./createSessionHandler');

const attachToServer = httpServer => {
  const socketServer = io(httpServer);

  socketServer.on('connection', socket => {
    socket.on('createSession', createSessionHandler);

    logger.info('New socket connection.');
  });
};

module.exports = attachToServer;
