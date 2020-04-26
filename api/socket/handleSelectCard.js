const PokerSession = require('../../data/models/PokerSession');
const Voting = require('../../data/models/Voting');
const toVotingResponse = require('../../utils/response/toVotingResponse');

const handleSelectCard = async (context, message) => {
  const sessionId = context.get('sessionId');
  const userId = context.get('userId');
  const serverSocket = context.get('serverSocket');
  const { card } = message;

  const currentVoting = await PokerSession.findById(sessionId, 'currentVoting');
  if (!currentVoting) {
    return;
  }

  const updatedVoting = await Voting.findOneAndUpdate(
    {
      _id: currentVoting['currentVoting'],
      'estimates.user': userId,
    },
    { 'estimates.$.card': card },
    { new: true }
  );

  serverSocket
    .to(sessionId)
    .emit('CARD_SELECTED', toVotingResponse(updatedVoting));
};

module.exports = handleSelectCard;
