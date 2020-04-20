const PokerSession = require('../../../data/models/PokerSession');
const { getCardSchema } = require('../../../utils/config/cardSchemas');
const logger = require('../../../utils/logger');
const propagateErrors = require('../utils/propagateErrors');
const ApiError = require('../utils/ApiError');

exports.createPokerSession = propagateErrors(async (req, res) => {
  const { topic, cardSchema } = req.body;

  const savedPokerSession = await PokerSession.create({ topic, cardSchema });

  logger.info(`Poker session ${savedPokerSession} created.`);

  res.status(200).json({
    sessionId: savedPokerSession['_id'],
    topic: savedPokerSession.topic,
    cardSchema: getCardSchema(savedPokerSession.cardSchema),
    stage: savedPokerSession.stage,
  });
});

exports.getPokerSession = propagateErrors(async (req, res) => {
  const { sessionId } = req.params;

  const pokerSession = await PokerSession.findById(sessionId);

  if (!pokerSession) {
    throw new ApiError(404, `Poker session ${sessionId} not found`);
  }

  res.status(200).json({
    sessionId: pokerSession['_id'],
    topic: pokerSession.topic,
    cardSchema: getCardSchema(pokerSession.cardSchema),
    stage: pokerSession.stage,
  });
});
