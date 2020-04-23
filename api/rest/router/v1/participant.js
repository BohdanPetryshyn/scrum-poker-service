const { Router } = require('express');

const { createParticipant } = require('../../controllers/participant');

const participantRouter = Router({ mergeParams: true });

participantRouter.post('/', createParticipant);

module.exports = participantRouter;
