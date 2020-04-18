const startRestServer = require('./api/rest/startServer');
const attachSocketListenerToServer = require('./api/socket/attachToServer');
const { SERVER_PORT } = require('./utils/config/server');

const httpServer = startRestServer(SERVER_PORT);
attachSocketListenerToServer(httpServer);
