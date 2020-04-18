const io = require('socket.io');

const createSessionHandler = require('./createSessionHandler');

const attachToServer = httpServer => {
  const socketServer = io(httpServer);

  socketServer.on('connection', socket => {
    socket.on('createSession', createSessionHandler);
  });
};

module.exports = attachToServer;
