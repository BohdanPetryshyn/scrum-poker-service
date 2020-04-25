const toUserResponse = user => ({
  userId: user['_id'],
  username: user.username,
  isHost: user.isHost,
});

module.exports = toUserResponse;
