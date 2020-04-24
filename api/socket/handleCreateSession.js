const createPokerSession = require('../../data/transaction/createPokerSessionn');
const toPokerSessionResponse = require('../../utils/response/toPokerSessionResponse');
const logger = require('../../utils/logger');

const handleCreateSession = ({ socket }) => async (message, ack) => {
  const { username, topic, cardSchema } = message;

  const savedPokerSession = await createPokerSession(
    topic,
    cardSchema,
    username
  );

  const sessionId = savedPokerSession['_id'];
  socket.join(sessionId);
  logger.info(`Host ${username} joined poker session ${sessionId}`);

  ack(toPokerSessionResponse(savedPokerSession));
};

module.exports = handleCreateSession;
