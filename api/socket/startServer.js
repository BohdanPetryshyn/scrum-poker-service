const io = require('socket.io');

const createSessionHandler = require('./createSessionHandler');

io.on('connection', socket => {
  socket.on('createSession', createSessionHandler);
});
