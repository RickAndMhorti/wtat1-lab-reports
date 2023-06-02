const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Region'
  },
  eloRating: {
    type: Number,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;