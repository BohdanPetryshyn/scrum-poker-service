const { getCardSchema } = require('../config/cardSchemas');
const toUserResponse = require('./toUserResponse');
const toVotingResponse = require('./toVotingResponse');

const toPokerSessionResponse = pokerSession => ({
  sessionId: pokerSession['_id'],
  topic: pokerSession.topic,
  cardSchema: getCardSchema(pokerSession.cardSchema),
  stage: pokerSession.stage,
  votings: pokerSession.votings
    ? pokerSession.votings.map(toVotingResponse)
    : [],
  users: pokerSession.users ? pokerSession.users.map(toUserResponse) : [],
});

module.exports = toPokerSessionResponse;
