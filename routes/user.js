const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.createUser);

module.exports = router;