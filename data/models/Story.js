const mongoose = require('mongoose');

const StorySchema = mongoose.Schema({
  name: {
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
    ref: 'Story',
    required: true,
  },
});

module.exports = mongoose.model('Schema', StorySchema);
