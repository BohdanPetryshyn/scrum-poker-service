const Participant = require('../../data/models/Participant');
const PokerSession = require('../../data/models/PokerSession');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const errorAck = require('./errorAck');
const handleDisconnection = require('./handleDisconnection');
const logger = require('../../utils/logger');

const sessionExists = async sessionId => {
  const sessionCount = await PokerSession.countDocuments({ _id: sessionId });
  return sessionCount > 0;
};

const getPopulatedSession = sessionId => {
  return PokerSession.findById(sessionId)
    .populate('host')
    .populate('participants')
    .populate({ path: 'votings', options: { sort: { createdAt: -1 } } })
    .exec();
};

const getParticipant = (username, sessionId) => {
  return Participant.findOne({ username, pokerSession: sessionId });
};

const reconnectExistingParticipant = async participant => {
  await Participant.update(participant, { connected: true });
  logger.info(
    `Participant ${participant.username} reconnected to session ${participant.sessionId}.`
  );
};

const createParticipant = async (username, sessionId) => {
  await Participant.create({ username, pokerSession: sessionId });
  logger.info(`New participant ${username} joined session ${sessionId}.`);
};

const handleJoinSession = ({ socket }) => async (message, ack) => {
  const { username, sessionId } = message;

  if (!(await sessionExists(sessionId))) {
    logger.info(
      `User ${username} tried to connect to unexisting session ${sessionId}.`
    );
    return ack(errorAck());
  }

  const existingParticipant = await getParticipant(username, sessionId);

  if (existingParticipant && existingParticipant.connected) {
    logger.info(
      `User ${username} tried to connect to session ${sessionId}, but connected user in the session already exists.`
    );
    return ack(errorAck());
  }

  let user = null;
  if (existingParticipant && !existingParticipant.connected) {
    await reconnectExistingParticipant(existingParticipant);
    user = existingParticipant;
  } else {
    user = await createParticipant(username, sessionId);
  }

  const updatedPokerSession = await getPopulatedSession(sessionId);
  socket.join(sessionId);
  socket.on('disconnect', handleDisconnection({ user }));
  return ack(toJoinResponse(updatedPokerSession, user));
};

module.exports = handleJoinSession;
