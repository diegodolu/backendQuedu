var express = require('express');
var RankingController = require('../controllers/RankingController');

var api = express.Router();

api.get('/ranking', RankingController.getRanking);

module.exports = api;