const toUserResponse = require('./toUserResponse');

const toEstimateResponse = estimate => ({
  user: toUserResponse(estimate.user),
  card: estimate.card,
});

module.exports = toEstimateResponse;
