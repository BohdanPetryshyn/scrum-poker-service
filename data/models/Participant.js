const mongoose = require('mongoose');

const ParticipantSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  pokerSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'PokerSession',
  },
});

const ParticipantModel = mongoose.model('Participant', ParticipantSchema);

ParticipantModel.createCollection();

module.exports = ParticipantModel;
