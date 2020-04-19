const PokerSession = require('../../../data/models/PokerSession');
const { getCardSchema } = require('../../../utils/config/cardSchemas');
const logger = require('../../../utils/logger');

exports.createPokerSession = async (req, res) => {
  const { topic, cardSchema } = req.body;

  const savedPokerSession = await PokerSession.create({ topic, cardSchema });

  logger.info(`Poker session ${savedPokerSession} created.`);

  res.status(200).json({
    sessionId: savedPokerSession['_id'],
    topic: savedPokerSession.topic,
    cardSchema: getCardSchema(savedPokerSession.cardSchema),
  });
};
