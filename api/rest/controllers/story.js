const Story = require('../../../data/models/Story');
const PokerSession = require('../../../data/models/PokerSession');
const propagateErrors = require('../utils/propagateErrors');
const ApiError = require('../utils/ApiError');

exports.createStory = propagateErrors(async (req, res) => {
  const { name, description } = req.body;
  const { sessionId } = req.params;

  const pokerSession = await PokerSession.findById(sessionId);
  if (!pokerSession) {
    throw new ApiError(404, `Poker session ${sessionId} not found.`);
  }

  const savedStory = await Story.create({
    name,
    description,
    pokerSession: sessionId,
  });

  res.status(200).json({
    storyId: savedStory['_id'],
    name: savedStory.name,
    description: savedStory.description,
    sessionId: savedStory.session,
  });
});