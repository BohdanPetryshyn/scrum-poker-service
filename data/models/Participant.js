const mongoose = require('mongoose');

const ParticipantSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  isHost: {
    type: Boolean,
    default: false,
  },
  pokerSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'PokerSession',
  },
  connected: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const ParticipantModel = mongoose.model('Participant', ParticipantSchema);
ParticipantModel.createCollection();
module.exports = ParticipantModel;
