const Story = require('../../data/models/Story');
const PokerSession = require('../../data/models/PokerSession');
const { SESSION_STAGES } = require('../../data/models/PokerSession');
const { VOTING_DURATION } = require('../../utils/config/environment');
const logger = require('../../utils/logger');

const getVotingFinishTime = () =>
  new Date(Date.now() + Number(VOTING_DURATION));

const saveStory = async (summary, description, sessionId) => {
  const savedStory = await Story.create({
    summary,
    description,
    pokerSession: sessionId,
  });
  logger.info(
    `Story "${savedStory.summary}" created in poker session ${sessionId}.`
  );
  return savedStory;
};

const toStoryResponse = story => ({
  storyId: story['_id'],
  summary: story.summary,
  description: story.description,
});

const setSessionVotingStory = async (sessionId, story) => {
  const votingFinishTime = getVotingFinishTime();
  const updatedSession = await PokerSession.findByIdAndUpdate(
    sessionId,
    {
      stage: SESSION_STAGES.VOTING,
      votingFinishTime,
      votingStory: story,
    },
    { new: true }
  );
  logger.info(`Session ${sessionId} is in VOTING stage now.`);
  return updatedSession;
};

const handleCreateStory = ({ serverSocket }) => async message => {
  const { summary, description, sessionId } = message;
  const savedStory = await saveStory(summary, description, sessionId);

  const updatedSession = await setSessionVotingStory(sessionId, savedStory);

  serverSocket.to(sessionId).emit('STORY_CREATED', {
    votingFinishTime: updatedSession.votingFinishTime.getTime(),
    story: toStoryResponse(savedStory),
  });
};

module.exports = handleCreateStory;
