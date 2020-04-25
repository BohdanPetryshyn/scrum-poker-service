const { Router } = require('express');

const cardSchemaRouter = require('./cardSchema');

const v1Router = Router();

v1Router.use('/card-schema', cardSchemaRouter);

module.exports = v1Router;
