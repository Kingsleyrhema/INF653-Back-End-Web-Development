const express = require('express');
const router = express.Router();
const controller = require('../controllers/statesController');

router.route('/')
  .get(controller.getAllStates);

router.route('/:state')
  .get(controller.getState);

router.route('/:state/funfact')
  .get(controller.getFunFact)
  .post(controller.createFunFact)
  .patch(controller.updateFunFact)
  .delete(controller.deleteFunFact);

router.get('/:state/capital', controller.getCapital);
router.get('/:state/nickname', controller.getNickname);
router.get('/:state/population', controller.getPopulation);
router.get('/:state/admission', controller.getAdmission);

module.exports = router;
