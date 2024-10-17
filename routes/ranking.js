const express = require('express');
const RankingController = require('../controllers/RankingController');

const router = express.Router();

router.get('/rankings', RankingController.getRanking);
router.post('/ranking/new', RankingController.createRanking);

module.exports = router;