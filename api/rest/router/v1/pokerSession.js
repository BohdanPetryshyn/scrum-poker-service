const { Router } = require('express');

const { createPokerSession } = require('../../controllers/pokerSession');

const pokerSessionRouter = Router();

pokerSessionRouter.post('/', createPokerSession);

module.exports = pokerSessionRouter;
