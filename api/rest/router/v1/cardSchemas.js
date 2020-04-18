const { Router } = require('express');

const { getCardSchemas } = require('../../controllers/cardSchemas');

const cardSchemasRouter = Router();

cardSchemasRouter.get('/', getCardSchemas);

module.exports = cardSchemasRouter;
