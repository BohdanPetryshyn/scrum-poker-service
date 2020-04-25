const Voting = require('../../data/models/Voting');
const User = require('../../data/models/User');
const PokerSession = require('../../data/models/PokerSession');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const { VOTING_DURATION } = require('../../utils/config/environment');
const toVotingResponse = require('../../utils/response/toVotingResponse');
const logger = require('../../utils/logger');

const getVotingFinishTime = () =>
  new Date(Date.now() + Number(VOTING_DURATION));

const setVotingStage = async sessionId => {
  const updatedSession = await PokerSession.findByIdAndUpdate(
    sessionId,
    {
      stage: SESSION_STAGES.VOTING,
    },
    { new: true }
  );
  logger.info(`Session ${sessionId} is now in VOTING stage.`);
  return updatedSession;
};

const getDefaultEstimates = async sessionId => {
  const sessionUsers = await User.find({ pokerSession: sessionId });
  return sessionUsers.filter(user => user.connected).map(user => ({ user }));
};

const createVoting = async (story, sessionId) => {
  const createdVoting = await Voting.create({
    story,
    finishTime: getVotingFinishTime(),
    pokerSession: sessionId,
    estimates: await getDefaultEstimates(sessionId),
  });
  logger.info(`Voting created in session ${sessionId}.`);
  return createdVoting;
};

const handleStartVoting = ({ serverSocket }) => async message => {
  const { story, sessionId } = message;

  await setVotingStage(sessionId);

  const createdVoting = await createVoting(story, sessionId);

  serverSocket
    .to(sessionId)
    .emit('VOTING_STARTED', toVotingResponse(createdVoting));
};

module.exports = handleStartVoting;
