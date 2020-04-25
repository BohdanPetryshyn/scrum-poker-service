const mongoose = require('mongoose');

const EstimateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  card: Number,
});
