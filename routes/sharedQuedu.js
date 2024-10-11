const express = require('express');
const SharedQueduController = require('../controllers/SharedQueduController');

const router = express.Router();

router.get('/sharedQuedus', SharedQueduController.getSharedQuedus);

module.exports = router;