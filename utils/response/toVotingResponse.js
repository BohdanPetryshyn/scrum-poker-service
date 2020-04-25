const toStoryResponse = require('./toStoryResponse');
const toEstimateResponse = require('./toEstimateResponse');

module.exports = voting => ({
  votingId: voting['_id'],
  story: toStoryResponse(voting.story),
  estimates: voting.estimates && voting.estimates.map(toEstimateResponse),
  finishTime: voting.finishTime && voting.finishTime.getTime(),
});
