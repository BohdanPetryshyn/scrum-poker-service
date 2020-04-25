const User = require('../../data/models/User');
const logger = require('../../utils/logger');

const handleDisconnection = ({ user }) => async reason => {
  await User.updateOne(user, { connected: false });
  logger.info(`User ${user.username} disconnected due to ${reason}.`);
};

module.exports = handleDisconnection;
