const PokerSession = require('../../data/models/PokerSession');
const Voting = require('../../data/models/Voting');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const toPokerSessionResponse = require('../../utils/response/toPokerSessionResponse');
const logger = require('../../utils/logger');

const setVotingResult = async (votingId, resultCard) => {
  await Voting.findByIdAndUpdate(votingId, {
    resultCard,
  });
  logger.info(`Voting ${votingId} result card set.`);
};

const updateSessionStage = async sessionId => {
  const updatedSession = await PokerSession.populateAll(
    PokerSession.findByIdAndUpdate(
      sessionId,
      {
        stage: SESSION_STAGES.WAITING,
        currentVoting: null,
      },
      { new: true }
    )
  );
  logger.info(`Session ${sessionId} is now in WAITING state`);
  return updatedSession;
};

const handleSetVotingResult = async (context, message) => {
  const sessionId = context.get('sessionId');
  const serverSocket = context.get('serverSocket');
  const { card } = message;

  const session = await PokerSession.findById(sessionId);
  const currentVotingId = session.currentVoting;
  if (!currentVotingId) {
    return;
  }

  await setVotingResult(currentVotingId, card);

  const updatedSession = await updateSessionStage(sessionId);

  serverSocket
    .to(sessionId)
    .emit('VOTING_RESULT_SET', toPokerSessionResponse(updatedSession));
};

module.exports = handleSetVotingResult;
