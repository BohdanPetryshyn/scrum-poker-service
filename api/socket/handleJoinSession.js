const User = require('../../data/models/User');
const PokerSession = require('../../data/models/PokerSession');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const errorAck = require('./errorAck');
const handleDisconnection = require('./handleDisconnection');
const logger = require('../../utils/logger');

const sessionExists = async sessionId => {
  const sessionCount = await PokerSession.countDocuments({ _id: sessionId });
  return sessionCount > 0;
};

const userConnected = user => user && user.connected;

const getPopulatedSession = sessionId => {
  return PokerSession.findById(sessionId)
    .populate('host')
    .populate('users')
    .populate({ path: 'votings', options: { sort: { createdAt: -1 } } })
    .exec();
};

const getUser = (username, sessionId) => {
  return User.findOne({ username, pokerSession: sessionId });
};

const reconnectExistingUser = async user => {
  const updatedUser = await User.findByIdAndUpdate(
    user['_id'],
    {
      connected: true,
    },
    { new: true }
  );
  logger.info(
    `User ${user.username} reconnected to session ${user.pokerSession}.`
  );
  return updatedUser;
};

const createUser = async (username, sessionId) => {
  const createdUser = await User.create({ username, pokerSession: sessionId });
  logger.info(`New user ${username} joined session ${sessionId}.`);
  return createdUser;
};

const handleJoinSession = async (context, message, ack) => {
  const socket = context.get('socket');
  const { username, sessionId } = message;

  if (!(await sessionExists(sessionId))) {
    logger.info(
      `User ${username} tried to connect to unexisting session ${sessionId}.`
    );
    ack(errorAck());
    return;
  }

  const existingUser = await getUser(username, sessionId);
  if (userConnected(existingUser)) {
    logger.info(
      `User ${username} tried to connect to session ${sessionId}, but connected user in the session already exists.`
    );
    ack(errorAck());
    return;
  }

  const user = existingUser
    ? await reconnectExistingUser(existingUser)
    : await createUser(username, sessionId);

  const updatedPokerSession = await getPopulatedSession(sessionId);
  socket.join(sessionId);
  socket.on('disconnect', handleDisconnection({ user }));
  socket.to(sessionId).emit('USER_JOINED', user);
  ack(toJoinResponse(updatedPokerSession, user));
};

module.exports = handleJoinSession;
