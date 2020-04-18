const mongoose = require('mongoose');

const cardSchemasConfig = require('../../utils/config/cardSchemas');

const PokerSessionSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  cardSchema: {
    type: String,
    enum: cardSchemasConfig.CARD_SCHEMAS,
    required: true,
  },
});

module.exports = mongoose.model('PokerSession', PokerSessionSchema);
