const Participant = require('../../../data/models/Participant');
const PokerSession = require('../../../data/models/PokerSession');
const propagateErrors = require('../utils/propagateErrors');
const toPokerSessionResponse = require('../../../utils/response/toPokerSessionResponse');
const ApiError = require('../utils/ApiError');

exports.createParticipant = propagateErrors(async (req, res) => {
  const { username } = req.body;
  const { sessionId } = req.params;

  const existingParticipant = await Participant.findOne({
    username,
    pokerSession: sessionId,
  });
  if (existingParticipant) {
    throw new ApiError(
      409,
      `Participant ${username} already exists in the session ${sessionId}.`
    );
  }

  await Participant.create({
    username,
    pokerSession: sessionId,
  });

  const updatedPokerSession = await PokerSession.findById(sessionId)
    .populate('host')
    .populate('participants')
    .exec();

  res.status(200).json(toPokerSessionResponse(updatedPokerSession));
});
