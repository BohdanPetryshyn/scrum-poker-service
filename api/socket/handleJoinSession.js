const Participant = require('../../data/models/Participant');
const PokerSession = require('../../data/models/PokerSession');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const errorAck = require('./errorAck');
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

const reconnectExistingParticipant = participant => {
  return Participant.update(participant, { connected: true });
};

const createParticipant = (username, sessionId) => {
  return Participant.create({ username, pokerSession: sessionId });
};

const handleJoinSession = ({ socket }) => async (message, ack) => {
  const { username, sessionId } = message;

  const existingParticipant = await getParticipant(username, sessionId);

  if (existingParticipant && existingParticipant.connected) {
    logger.info(
      `User ${username} tried to connect to session ${sessionId}, but connected user in the session already exists.`
    );
    ack(errorAck());
  }

  if (existingParticipant && !existingParticipant.connected) {
    await reconnectExistingParticipant(existingParticipant);
    logger.info(`Participant ${username} reconnected to session ${sessionId}.`);

    const updatedPokerSession = await getPopulatedSession(sessionId);
    ack(toJoinResponse(updatedPokerSession, existingParticipant));
    return socket.join(sessionId);
  }

  if (!(await sessionExists(sessionId))) {
    logger.info(
      `User ${username} tried to connect to unexisting session ${sessionId}.`
    );
    ack(errorAck());
  }

  const createdParticipant = await createParticipant(username, sessionId);
  logger.info(`New participant ${username} joined session ${sessionId}.`);

  const updatedPokerSession = await getPopulatedSession(sessionId);
  ack(toJoinResponse(updatedPokerSession, createdParticipant));
  return socket.join(sessionId);
};

module.exports = handleJoinSession;
