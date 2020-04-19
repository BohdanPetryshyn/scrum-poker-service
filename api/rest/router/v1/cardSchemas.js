const { Router } = require('express');

const { getCardSchemas } = require('../../controllers/cardSchema');

const cardSchemaRouter = Router();

cardSchemaRouter.get('/', getCardSchemas);

module.exports = cardSchemaRouter;
