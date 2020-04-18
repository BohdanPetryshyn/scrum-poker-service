import express from 'express';

import router from './router';
import { SERVER_PORT } from '../../utils/config/server';
import logger from '../../utils/logger';

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(SERVER_PORT, () => {
  logger.info(`server listening on port ${SERVER_PORT}`);
});
