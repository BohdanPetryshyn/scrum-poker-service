const { Router } = require('express');

const cardSchemasRouter = require('./cardSchemas');

const v1Router = Router();

v1Router.use('/card-schemas', cardSchemasRouter);

module.exports = v1Router;
