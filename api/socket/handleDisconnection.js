const User = require('../../data/models/User');
const logger = require('../../utils/logger');

const handleDisconnection = async (context, reason) => {
  const userId = context.get('userId');
  await User.findByIdAndUpdate(userId, { connected: false });
  logger.info(`User ${userId} disconnected due to ${reason}.`);
};

module.exports = handleDisconnection;
