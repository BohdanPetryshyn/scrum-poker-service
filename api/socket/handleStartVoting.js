const Voting = require('../../data/models/Voting');
const PokerSession = require('../../data/models/PokerSession');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const { VOTING_DURATION } = require('../../utils/config/environment');
const toVotingResponse = require('../../utils/response/toVotingResponse');
const logger = require('../../utils/logger');

const getVotingFinishTime = () =>
  new Date(Date.now() + Number(VOTING_DURATION));

const handleStartVoting = ({ serverSocket }) => async message => {
  const { story, sessionId } = message;

  const savedVoting = await Voting.create({
    story,
    finishTime: getVotingFinishTime(),
    pokerSession: sessionId,
  });
  logger.info(`Voting ${savedVoting} created in session ${sessionId}.`);

  await PokerSession.findByIdAndUpdate(sessionId, {
    stage: SESSION_STAGES.VOTING,
  });
  logger.info(`Session ${sessionId} is now in VOTING stage.`);

  serverSocket
    .to(sessionId)
    .emit('VOTING_STARTED', toVotingResponse(savedVoting));
};

module.exports = handleStartVoting;
