const mongoose = require('mongoose');

const Story = require('./Story');
const Estimate = require('./Estimate');

const VotingSchema = mongoose.Schema({
  story: {
    type: Story,
    required: true,
  },
  estimates: {
    type: [Estimate],
    required: true,
  },
  resultCard: Number,
  finishTime: {
    type: Date,
    required: true,
  },
  pokerSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'PokerSchema',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const VotingModel = mongoose.model('Voting', VotingSchema);
VotingModel.createCollection();
module.exports = VotingModel;
