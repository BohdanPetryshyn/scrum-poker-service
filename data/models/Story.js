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
});

module.exports = StorySchema;
