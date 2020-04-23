const { getCardSchema } = require('../../../../utils/config/cardSchemas');
const toParticipantResponse = require('./toParticipantResponse');

const toPokerSessionResponse = pokerSession => ({
  sessionId: pokerSession['_id'],
  topic: pokerSession.topic,
  stage: pokerSession.stage,
  cardSchema: getCardSchema(pokerSession.cardSchema),
  host: toParticipantResponse(pokerSession.host),
  votingFinishTime:
    pokerSession.votingFinishTime && pokerSession.votingFinishTime.getTime(),
});

module.exports = toPokerSessionResponse;
