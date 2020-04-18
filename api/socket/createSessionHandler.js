const PokerSession = require('../../data/models/PokerSession');
const logger = require('../../utils/logger');

module.exports = async (message, ack) => {
  const { username, topic, cardSchema } = message;

  const savedPokerSession = await PokerSession.create({ topic, cardSchema });
  ack(savedPokerSession);

  logger.info(`User: ${username} created poker session ${savedPokerSession}`);
};
