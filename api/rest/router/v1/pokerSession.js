const { Router } = require('express');

const {
  createPokerSession,
  getPokerSession,
} = require('../../controllers/pokerSession');
const storyRouter = require('./story');

const pokerSessionRouter = Router();

pokerSessionRouter.post('/', createPokerSession);
pokerSessionRouter.get('/:sessionId', getPokerSession);

pokerSessionRouter.use('/:sessionId/story', storyRouter);

module.exports = pokerSessionRouter;
