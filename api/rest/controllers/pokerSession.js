const PokerSession = require('../../../data/models/PokerSession');
const { getCardSchema } = require('../../../utils/config/cardSchemas');
const logger = require('../../../utils/logger');
const propagateErrors = require('../utils/propagateErrors');
const ApiError = require('../utils/ApiError');

const toPokerSessionResponse = pokerSession => ({
  sessionId: pokerSession['_id'],
  topic: pokerSession.topic,
  stage: pokerSession.stage,
  cardSchema: getCardSchema(pokerSession.cardSchema),
});

exports.createPokerSession = propagateErrors(async (req, res) => {
  const { topic, cardSchema } = req.body;

  const savedPokerSession = await PokerSession.create({ topic, cardSchema });

  logger.info(`Poker session ${savedPokerSession} created.`);

  res.status(200).json(toPokerSessionResponse(savedPokerSession));
});

exports.getPokerSession = propagateErrors(async (req, res) => {
  const { sessionId } = req.params;

  const pokerSession = await PokerSession.findById(sessionId);

  if (!pokerSession) {
    throw new ApiError(404, `Poker session ${sessionId} not found`);
  }

  res.status(200).json(toPokerSessionResponse(pokerSession));
});
