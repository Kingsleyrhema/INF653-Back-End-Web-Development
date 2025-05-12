const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true
  },
  funfacts: [String]
});

module.exports = mongoose.model('State', stateSchema);
=======
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
>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
