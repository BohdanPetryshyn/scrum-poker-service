require('dotenv').config({ path: './config/.env' });

const startRestServer = require('./api/rest/startServer');
const attachSocketListenerToServer = require('./api/socket/attachToServer');
const connectDatabase = require('./data/connectDatabase');
const { SERVER_PORT } = require('./utils/config/environment');

connectDatabase();

const httpServer = startRestServer(SERVER_PORT);
attachSocketListenerToServer(httpServer);
