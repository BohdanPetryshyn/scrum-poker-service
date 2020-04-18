const mongoose = require('mongoose');

const { CARD_SCHEMA_NAMES } = require('../../utils/config/cardSchemas');

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
});

module.exports = mongoose.model('PokerSession', PokerSessionSchema);
