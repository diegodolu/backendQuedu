const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const upload = UserController.upload

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.createUser);
router.post('/user/course/new', UserController.createCourse);
router.post('/user/course/quedu/new', UserController.createPersonalQuedus);
router.post('/user/course/quedu/recibeFile', upload.single('document'), UserController.recibeFile);

module.exports = router;