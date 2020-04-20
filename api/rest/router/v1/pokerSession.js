const { Router } = require('express');

const {
  createPokerSession,
  getPokerSession,
} = require('../../controllers/pokerSession');

const pokerSessionRouter = Router();

pokerSessionRouter.post('/', createPokerSession);
pokerSessionRouter.get('/:sessionId', getPokerSession);

module.exports = pokerSessionRouter;
