const io = require('socket.io');
const { Map } = require('immutable');
const logger = require('../../utils/logger');

const createContextProvider = require('../../utils/createContextProvider');
const handleStartVoting = require('./handleStartVoting');
const handleCreateSession = require('./handleCreateSession');
const handleJoinSession = require('./handleJoinSession');
const handleDisconnection = require('./handleDisconnection');
const handleSelectCard = require('./handleSelectCard');
const handleSetVotingResult = require('./handleSetVotingResult');

const attachToServer = httpServer => {
  const serverSocket = io(httpServer);

  serverSocket.on('connection', socket => {
    const withContext = createContextProvider(Map({ socket, serverSocket }));

    socket.on('CREATE_SESSION', withContext(handleCreateSession));
    socket.on('JOIN_SESSION', withContext(handleJoinSession));

    socket.on('START_VOTING', withContext(handleStartVoting));
    socket.on('SELECT_CARD', withContext(handleSelectCard));
    socket.on('SET_VOTING_RESULT', withContext(handleSetVotingResult));

    socket.on('disconnect', withContext(handleDisconnection));
    logger.info('New socket connection.');
  });
};

module.exports = attachToServer;
