import startRestServer from './api/rest/startServer';
import attachSocketListenerToServer from './api/socket/attachToServer';
import { SERVER_PORT } from './utils/config/server';

const httpServer = startRestServer(SERVER_PORT);
attachSocketListenerToServer(httpServer);
