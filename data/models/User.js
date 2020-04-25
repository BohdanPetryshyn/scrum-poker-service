const mongoose = require('mongoose');

const User = mongoose.Schema({
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

const UserModel = mongoose.model('User', User);
UserModel.createCollection();
module.exports = UserModel;
