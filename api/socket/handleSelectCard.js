const PokerSession = require('../../data/models/PokerSession');
const Voting = require('../../data/models/Voting');
const toVotingResponse = require('../../utils/response/toVotingResponse');
const logger = require('../../utils/logger');

const updateEstimate = async (votingId, userId, card) => {
  const updatedVoting = await Voting.findOneAndUpdate(
    {
      _id: votingId,
      'estimates.user': userId,
    },
    { 'estimates.$.card': card },
    { new: true }
  );
  logger.info(`User ${userId} changed card to ${card}.`);
  return updatedVoting;
};

const createEstimate = async (votingId, userId, card) => {
  const createdEstimate = await Voting.findByIdAndUpdate(
    votingId,
    {
      $push: { estimates: { user: userId, card } },
    },
    { new: true }
  );
  logger.info(`User ${userId} voted with card ${card}.`);
  return createdEstimate;
};

const areAllUsersVoted = (users, voting) => {
  return users
    .filter(user => user.connected)
    .every(user =>
      voting.estimates.includes(
        estimate => estimate.user['_id'] === user['_id']
      )
    );
};

const handleSelectCard = async (context, message) => {
  const sessionId = context.get('sessionId');
  const userId = context.get('userId');
  const serverSocket = context.get('serverSocket');
  const { card } = message;

  const session = await PokerSession.findById(sessionId).populate('users');
  const currentVotingId = session.currentVoting;
  if (!currentVotingId) {
    return;
  }

  const updatedVoting =
    (await updateEstimate(currentVotingId, userId, card)) ||
    (await createEstimate(currentVotingId, userId, card));

  if (areAllUsersVoted(updatedVoting)) {
    serverSocket
      .to(sessionId)
      .emit('VOTING_ENDED', toVotingResponse(updatedVoting));
    return;
  }

  serverSocket
    .to(sessionId)
    .emit('USER_CARD_CHANGED', toVotingResponse(updatedVoting));
};

module.exports = handleSelectCard;
