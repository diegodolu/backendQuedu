var express = require('express');
var sharedQueduController = require('../controllers/sharedQueduController');

var api = express.Router();

api.get('/sharedQuedu', sharedQueduController.getUser);

module.exports = api;