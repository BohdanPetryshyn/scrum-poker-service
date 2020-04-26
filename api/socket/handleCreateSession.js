const PokerSession = require('../../data/models/PokerSession');
const User = require('../../data/models/User');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const logger = require('../../utils/logger');

const handleCreateSession = async (context, message, ack) => {
  const socket = context.get('socket');
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
  logger.info(`Host ${username} joined poker session ${sessionId}`);

  ack(toJoinResponse(createdSession, createdUser));
  return context.merge({
    userId: createdUser['_id'],
    sessionId: createdSession['_id'],
  });
};

module.exports = handleCreateSession;
