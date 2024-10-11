var express = require('express');
var CommunityController = require('../controllers/CommunityController');

var api = express.Router();

api.get('/community', CommunityController.getCommunity);

module.exports = api;