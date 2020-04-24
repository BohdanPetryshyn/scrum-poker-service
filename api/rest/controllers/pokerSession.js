const PokerSession = require('../../../data/models/PokerSession');
const propagateErrors = require('../utils/propagateErrors');
const ApiError = require('../utils/ApiError');
const createPokerSession = require('../../../data/transaction/createPokerSessionn');
const toPokerSessionResponse = require('../../../utils/response/toPokerSessionResponse');

exports.createPokerSession = propagateErrors(async (req, res) => {
  const { topic, cardSchema, username } = req.body;

  const savedPokerSession = await createPokerSession(
    topic,
    cardSchema,
    username
  );

  res.status(200).json(toPokerSessionResponse(savedPokerSession));
});

exports.getPokerSession = propagateErrors(async (req, res) => {
  const { sessionId } = req.params;

  const pokerSession = await PokerSession.findById(sessionId).populate('host');

  if (!pokerSession) {
    throw new ApiError(404, `Poker session ${sessionId} not found`);
  }

  res.status(200).json(toPokerSessionResponse(pokerSession));
});
