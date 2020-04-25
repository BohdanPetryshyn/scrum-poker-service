const toPokerSessionResponse = require('./toPokerSessionResponse');
const toParticipantResponse = require('./toParticipantResponse');

const toJoinResponse = (pokerSession, participant) => ({
  pokerSession: toPokerSessionResponse(pokerSession),
  user: toParticipantResponse(participant),
});

module.exports = toJoinResponse;
