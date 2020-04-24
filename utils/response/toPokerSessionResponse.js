const { getCardSchema } = require('../config/cardSchemas');
const toParticipantResponse = require('./toParticipantResponse');

const toPokerSessionResponse = pokerSession => ({
  sessionId: pokerSession['_id'],
  topic: pokerSession.topic,
  stage: pokerSession.stage,
  cardSchema: getCardSchema(pokerSession.cardSchema),
  host: toParticipantResponse(pokerSession.host),
  participants:
    pokerSession.participants &&
    pokerSession.participants.map(toParticipantResponse),
  votingFinishTime:
    pokerSession.votingFinishTime && pokerSession.votingFinishTime.getTime(),
});

module.exports = toPokerSessionResponse;
