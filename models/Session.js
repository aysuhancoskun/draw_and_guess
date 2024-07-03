const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    currentDrawer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    correctAnswer: { type: String }, // Bu alan tamamen opsiyonel hale geldi
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
