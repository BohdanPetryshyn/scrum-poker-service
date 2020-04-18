import { Router } from 'express';

import cardSchemasRouter from './cardSchemas';

const v1Router = Router();

v1Router.use('/card-schemas', cardSchemasRouter);

export default v1Router;
