const mongoose = require('mongoose');

const StorySchema = mongoose.Schema({
  summary: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  pokerSession: {
    type: mongoose.Schema.ObjectId,
    ref: 'PokerSession',
    required: true,
  },
});

const StoryModel = mongoose.model('Story', StorySchema);
StoryModel.createCollection();
module.exports = StoryModel;
