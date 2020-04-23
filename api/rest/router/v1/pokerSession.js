const { Router } = require('express');

const {
  createPokerSession,
  getPokerSession,
} = require('../../controllers/pokerSession');
const storyRouter = require('./story');
const participantRouter = require('./participant');

const pokerSessionRouter = Router();

pokerSessionRouter.post('/', createPokerSession);
pokerSessionRouter.get('/:sessionId', getPokerSession);

pokerSessionRouter.use('/:sessionId/story', storyRouter);
pokerSessionRouter.use('/:sessionId/participant', participantRouter);

module.exports = pokerSessionRouter;
