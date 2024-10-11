const express = require('express');
const RankingController = require('../controllers/RankingController');

const router = express.Router();

router.get('/rankings', RankingController.getRanking);

module.exports = router;