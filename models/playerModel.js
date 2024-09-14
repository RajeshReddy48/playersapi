const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
  style: { type: String, required: true },
  battingAvg: { type: Number, required: true }
}, { collection: 'TeamsCollection' });

module.exports = mongoose.model('Player', playerSchema);
