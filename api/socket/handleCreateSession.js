const PokerSession = require('../../data/models/PokerSession');
const User = require('../../data/models/User');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const handleDisconnection = require('./handleDisconnection');
const logger = require('../../utils/logger');

const handleCreateSession = ({ socket }) => async (message, ack) => {
  const { username, topic, cardSchema } = message;

  const createdSession = await PokerSession.create({ topic, cardSchema });
  const sessionId = createdSession['_id'];
  const createdUser = await User.create({
    username,
    isHost: true,
    pokerSession: sessionId,
  });
  createdSession.users = [createdUser];

  socket.join(sessionId);
  socket.on('disconnect', handleDisconnection({ user: createdUser }));
  logger.info(`Host ${username} joined poker session ${sessionId}`);

  ack(toJoinResponse(createdSession, createdUser));
};

module.exports = handleCreateSession;
