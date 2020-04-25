const Participant = require('../../data/models/Participant');
const logger = require('../../utils/logger');

const handleDisconnection = ({ user }) => async reason => {
  await Participant.update(user, { connected: false });
  logger.info(`User ${user.username} disconnected due to ${reason}.`);
};

module.exports = handleDisconnection;
