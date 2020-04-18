import { Router } from 'express';

import { getCardSchemas } from '../../controllers/cardSchemas';

const cardSchemasRouter = Router();

cardSchemasRouter.get('/', getCardSchemas);

export default cardSchemasRouter;
