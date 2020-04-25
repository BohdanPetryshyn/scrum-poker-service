const PokerSession = require('../../data/models/PokerSession');
const Participant = require('../../data/models/Participant');
const toJoinResponse = require('../../utils/response/toJoinResponse');
const handleDisconnection = require('./handleDisconnection');
const logger = require('../../utils/logger');

const handleCreateSession = ({ socket }) => async (message, ack) => {
  const { username, topic, cardSchema } = message;

  const savedSession = await PokerSession.create({ topic, cardSchema });
  const sessionId = savedSession['_id'];
  const savedParticipant = await Participant.create({
    username,
    isHost: true,
    pokerSession: sessionId,
  });

  socket.join(sessionId);
  socket.on('disconnect', handleDisconnection({ user: savedParticipant }));
  logger.info(`Host ${username} joined poker session ${sessionId}`);

  ack(toJoinResponse(savedSession, savedParticipant));
};

module.exports = handleCreateSession;
