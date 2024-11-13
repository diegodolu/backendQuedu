const express = require('express');
const UserController = require('../controllers/UserController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = UserController.upload; 

router.get('/users', verificarToken, UserController.getUsers);
router.get('/user/:id', verificarToken, UserController.getUserById);
router.get('/users/:id/courses', verificarToken, UserController.getCoursesByUserId);

router.post('/user', UserController.createUser);
router.post('/user/login', UserController.loginUser);
router.post('/user/course/new', verificarToken, UserController.createCourse);
router.post('/user/course/quedu/new', UserController.createPersonalQuedus);
router.post('/user/lastQuedu', verificarToken, UserController.getLastQuedu);
router.get('/user/quedus/:id', verificarToken, UserController.getRecentPersonalQuedusByUser);
router.put('/quedu/update', verificarToken, UserController.updateQuedu);
router.post('/user/subscribeTo', verificarToken, UserController.subscribeToCommunity);
router.post('/user/shareQuedu', verificarToken, UserController.sharePersonalQuedu);

router.post('/user/course/quedu/generateQuedu', upload.single('document'), UserController.generateQuedu);

module.exports = router;