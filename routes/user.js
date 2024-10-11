var express = require('express');
var UserController = require('../controllers/UserController');

var api = express.Router();

api.get('/user/:id', UserController.getUser);

module.exports = api;