const io = require('socket.io');
const logger = require('../../utils/logger');

const handleCreateStory = require('./handleCreateStory');
const handleCreateSession = require('./handleCreateSession');
const handleJoinSession = require('./handleJoinSession');

const attachToServer = httpServer => {
  const serverSocket = io(httpServer);

  serverSocket.on('connection', socket => {
    socket.on('CREATE_SESSION', handleCreateSession({ socket }));
    socket.on('CREATE_STORY', handleCreateStory({ serverSocket }));

    socket.on('JOIN_SESSION', handleJoinSession({ socket }));

    logger.info('New socket connection.');
  });
};

module.exports = attachToServer;
