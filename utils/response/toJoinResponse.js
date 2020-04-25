const toPokerSessionResponse = require('./toPokerSessionResponse');
const toUserResponse = require('./toUserResponse');

const toJoinResponse = (pokerSession, user) => ({
  pokerSession: toPokerSessionResponse(pokerSession),
  user: toUserResponse(user),
});

module.exports = toJoinResponse;
