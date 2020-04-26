const mongoose = require('mongoose');

const logger = require('../utils/logger');
const { MONGO_DB_CONNECTION_STRING } = require('../utils/config/environment');

//mongoose.set('debug', true);

module.exports = async () => {
  const connection = await mongoose.connect(MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  logger.info(`MongoDB connected at host=${connection.connection.host}`);
};
