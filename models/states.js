const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  state: String,
  capital_city: String,
  nickname: String,
  population: Number,
  admission_date: String,
  funfacts: [String],  // Array of fun facts for each state
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
