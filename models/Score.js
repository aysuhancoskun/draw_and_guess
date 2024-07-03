const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  points: { type: Number, default: 0 },
  badges: [{ type: String }]
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
