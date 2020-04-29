const Voting = require('../../data/models/Voting');
const PokerSession = require('../../data/models/PokerSession');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const { VOTING_DURATION } = require('../../utils/config/environment');
const toVotingResponse = require('../../utils/response/toVotingResponse');
const logger = require('../../utils/logger');

const getVotingFinishTime = () =>
  new Date(Date.now() + Number(VOTING_DURATION));

const setCurrentVoting = async (sessionId, votingId) => {
  await PokerSession.findByIdAndUpdate(sessionId, {
    stage: SESSION_STAGES.VOTING,
    currentVoting: votingId,
  });
  logger.info(`Session ${sessionId} is now in VOTING stage.`);
};

const createVoting = async (story, sessionId) => {
  const createdVoting = await Voting.create({
    story,
    finishTime: getVotingFinishTime(),
    pokerSession: sessionId,
    estimates: [],
  });
  logger.info(`Voting created in session ${sessionId}.`);
  return createdVoting;
};

const scheduleVotingEnd = (votingId, serverSocket, sessionId) => {
  setTimeout(async () => {
    PokerSession.findByIdAndUpdate(sessionId, { stage: SESSION_STAGES.RESULT });
    const voting = await Voting.findById(votingId);
    serverSocket.to(sessionId).emit('VOTING_ENDED', toVotingResponse(voting));
  }, VOTING_DURATION);
};

const handleStartVoting = async (context, message) => {
  const serverSocket = context.get('serverSocket');
  const sessionId = context.get('sessionId');
  const { story } = message;

  const createdVoting = await createVoting(story, sessionId);

  await setCurrentVoting(sessionId, createdVoting['_id']);

  scheduleVotingEnd(createdVoting['_id'], serverSocket, sessionId);

  serverSocket
    .to(sessionId)
    .emit('VOTING_STARTED', toVotingResponse(createdVoting));
};

module.exports = handleStartVoting;
