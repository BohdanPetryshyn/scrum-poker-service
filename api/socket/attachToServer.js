const io = require('socket.io');
const logger = require('../../utils/logger');

const handleCreateStory = require('./handleCreateStory');

const attachToServer = httpServer => {
  const serverSocket = io(httpServer);

  serverSocket.on('connection', socket => {
    socket.on('HOST_SESSION', ({ sessionId }) => {
      socket.join(sessionId);

      socket.on('CREATE_STORY', handleCreateStory({ serverSocket, sessionId }));

      logger.info(`Host joined poker session ${sessionId}`);
    });

    socket.on('JOIN_SESSION', ({ sessionId }) => {
      socket.join(sessionId);

      logger.info(`New participant joined poker session ${sessionId}`);
    });

    logger.info('New socket connection.');
  });
};

module.exports = attachToServer;
