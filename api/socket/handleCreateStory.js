const Story = require('../../data/models/Story');
const logger = require('../../utils/logger');

const handleCreateStory = ({ socket, sessionId }) => story => {
  Story.create({ ...story, pokerSession: sessionId }).then(
    logger.info(`Story "${story.name}" created in poker session ${sessionId}.`)
  );

  socket.to(sessionId).emit('STORY_CREATED', story);
};

module.exports = handleCreateStory;
