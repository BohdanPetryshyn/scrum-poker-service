const { Router } = require('express');

const cardSchemasRouter = require('./cardSchemas');
const pokerSessionRouter = require('./pokerSession');

const v1Router = Router();

v1Router.use('/card-schemas', cardSchemasRouter);
v1Router.use('/poker-session', pokerSessionRouter);

module.exports = v1Router;
