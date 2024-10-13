const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.createUser);
router.post('/user/course/new', UserController.createCourse);
router.post('/user/course/quedu/new', UserController.createPersonalQuedus);
router.post('/user/subscribeTo', UserController.subscribeToCommunity);
router.post('/user/shareQuedu', UserController.sharePersonalQuedu);

module.exports = router;