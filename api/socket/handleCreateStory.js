const Story = require('../../data/models/Story');
const PokerSession = require('../../data/models/PokerSession');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const { VOTING_DURATION } = require('../../utils/config/environment');
const logger = require('../../utils/logger');

const getVotingFinishTime = () =>
  new Date(Date.now() + Number(VOTING_DURATION));

const handleCreateStory = ({ serverSocket, sessionId }) => story => {
  Story.create({ ...story, pokerSession: sessionId }).then(
    logger.info(
      `Story "${story.summary}" created in poker session ${sessionId}.`
    )
  );

  const votingFinishTime = getVotingFinishTime();
  PokerSession.findByIdAndUpdate(sessionId, {
    stage: SESSION_STAGES.VOTING,
    votingFinishTime,
  }).then(() => logger.info(`Session ${sessionId} is in VOTING stage now.`));

  serverSocket.to(sessionId).emit('STORY_CREATED', {
    votingFinishTime: votingFinishTime.getTime(),
    story,
  });
};

module.exports = handleCreateStory;
