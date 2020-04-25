const { getCardSchema } = require('../config/cardSchemas');
const toParticipantResponse = require('./toParticipantResponse');
const toVotingResponse = require('./toVotingResponse');

const toPokerSessionResponse = pokerSession => ({
  sessionId: pokerSession['_id'],
  topic: pokerSession.topic,
  host: toParticipantResponse(pokerSession.host),
  cardSchema: getCardSchema(pokerSession.cardSchema),
  stage: pokerSession.stage,
  votings: pokerSession.participants
    ? pokerSession.votings.map(toVotingResponse)
    : [],
  participants: pokerSession.participants
    ? pokerSession.participants.map(toParticipantResponse)
    : [],
});

module.exports = toPokerSessionResponse;
