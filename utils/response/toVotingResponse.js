const toStoryResponse = require('./toStoryResponse');

module.exports = voting => ({
  votingId: voting['_id'],
  story: toStoryResponse(voting.story),
  finishTime: voting.finishTime && voting.finishTime.getTime(),
});
