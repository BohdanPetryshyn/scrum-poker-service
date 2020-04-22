const mongoose = require('mongoose');

const { CARD_SCHEMA_NAMES } = require('../../utils/config/cardSchemas');

const SESSION_STAGES = {
  WAITING: 'WAITING',
  VOTING: 'VOTING',
  RESULT: 'RESULT',
};

const PokerSessionSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  cardSchema: {
    type: String,
    enum: CARD_SCHEMA_NAMES,
    required: true,
  },
  stage: {
    type: String,
    enum: [
      SESSION_STAGES.WAITING,
      SESSION_STAGES.VOTING,
      SESSION_STAGES.RESULT,
    ],
    default: SESSION_STAGES.WAITING,
  },
  votingFinishTime: Date,
});

module.exports = mongoose.model('PokerSession', PokerSessionSchema);
module.exports.SESSION_STAGES = SESSION_STAGES;
