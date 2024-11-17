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
router.get('/user/:id/quedus/:queduId', verificarToken, UserController.getPersonalQueduById);
router.put('/quedu/update', verificarToken, UserController.updateQuedu);
router.post('/user/subscribeTo', verificarToken, UserController.subscribeToCommunity);
router.post('/user/shareQuedu', verificarToken, UserController.sharePersonalQuedu);
router.delete('/course/delete', verificarToken, UserController.deleteCourse);
router.put('/course/update', verificarToken, UserController.updateCourse);
router.post('/user/course/quedu/generateQuedu', upload.single('document'), verificarToken, UserController.generateQuedu);

module.exports = router;