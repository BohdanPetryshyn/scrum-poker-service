const { Router } = require('express');

const cardSchemaRouter = require('./cardSchema');
const pokerSessionRouter = require('./pokerSession');

const v1Router = Router();

v1Router.use('/card-schema', cardSchemaRouter);
v1Router.use('/poker-session', pokerSessionRouter);

module.exports = v1Router;
