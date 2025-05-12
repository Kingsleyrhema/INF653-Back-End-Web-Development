const statesData = require('../data/statesData.json');
const State = require('../models/states');

// Validate state param is a 2-letter code
const findState = (param) => {
  if (param.length !== 2) return null;
  const code = param.toUpperCase();
  return statesData.find(st => st.code === code) || null;
};

const getAllStates = async (req, res) => {
  const contig = req.query.contig;
  let states = [...statesData];

  if (contig === 'true') {
    states = states.filter(st => st.code !== 'AK' && st.code !== 'HI');
  } else if (contig === 'false') {
    states = states.filter(st => st.code === 'AK' || st.code === 'HI');
  }

  const dbStates = await State.find();
  states = states.map(st => {
    const match = dbStates.find(db => db.stateCode === st.code);
    if (match?.funfacts?.length) {
      return { ...st, funfacts: match.funfacts };
    }
    return st;
  });

  res.json(states);
};

const getState = async (req, res) => {
  const state = findState(req.params.state);
  if (!state) {
    return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  }

  const dbState = await State.findOne({ stateCode: state.code }).exec();
  if (dbState?.funfacts?.length) state.funfacts = dbState.funfacts;

  res.json(state);
};

const getFunFact = async (req, res) => {
  const state = findState(req.params.state);
  if (!state) {
    return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  }

  const dbState = await State.findOne({ stateCode: state.code }).exec();
  if (!dbState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
  }

  const random = dbState.funfacts[Math.floor(Math.random() * dbState.funfacts.length)];
  res.json({ funfact: random });
};

const getCapital = (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  res.json({ state: state.state, capital: state.capital_city });
};

const getNickname = (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  res.json({ state: state.state, nickname: state.nickname });
};

const getPopulation = (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  res.json({ state: state.state, population: state.population });
};

const getAdmission = (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });
  res.json({ state: state.state, admitted: state.admission_date });
};

// ------------------- POST Fun Facts -------------------
const createFunFact = async (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });

  const { funfacts } = req.body;
  if (!funfacts || !Array.isArray(funfacts) || funfacts.length === 0) {
    return res.status(400).json({ message: 'State fun facts value required' });
  }

  let dbState = await State.findOne({ stateCode: state.code }).exec();

  if (!dbState) {
    dbState = await State.create({ stateCode: state.code, funfacts });
  } else {
    dbState.funfacts.push(...funfacts);
    await dbState.save();
  }

  res.json(dbState);
};

// ------------------- PATCH Fun Facts -------------------
const updateFunFact = async (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });

  const { index, funfact } = req.body;
  if (!index) return res.status(400).json({ message: 'State fun fact index value required' });
  if (!funfact) return res.status(400).json({ message: 'State fun fact value required' });

  const dbState = await State.findOne({ stateCode: state.code }).exec();
  if (!dbState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
  }

  const i = index - 1;
  if (i < 0 || i >= dbState.funfacts.length) {
    return res.status(400).json({ message: `No Fun Fact found at that index for ${state.state}` });
  }

  dbState.funfacts[i] = funfact;
  await dbState.save();

  res.json(dbState);
};

// ------------------- DELETE Fun Facts -------------------
const deleteFunFact = async (req, res) => {
  const state = findState(req.params.state);
  if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter" });

  const { index } = req.body;
  if (!index) return res.status(400).json({ message: 'State fun fact index value required' });

  const dbState = await State.findOne({ stateCode: state.code }).exec();
  if (!dbState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
  }

  const i = index - 1;
  if (i < 0 || i >= dbState.funfacts.length) {
    return res.status(400).json({ message: `No Fun Fact found at that index for ${state.state}` });
  }

  dbState.funfacts.splice(i, 1);
  await dbState.save();

  res.json(dbState);
};

module.exports = {
  getAllStates,
  getState,
  getFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  createFunFact,
  updateFunFact,
  deleteFunFact,
};
