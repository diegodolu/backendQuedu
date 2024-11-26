const express = require('express');
const UserController = require('../controllers/UserController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = UserController.upload; 

router.get('/users', verificarToken, UserController.getUsers);
router.get('/user/:id', verificarToken, UserController.getUserById);

router.post('/user', UserController.createUser); //ok
router.post('/user/login', UserController.loginUser); //ok
router.get('/user/quedus/:id', verificarToken, UserController.getRecentPersonalQuedusByUser); //ok
router.get('/users/:id/courses', verificarToken, UserController.getCoursesByUserId); //ok
router.post('/user/course/quedu/generateQuedu', upload.single('document'), verificarToken, UserController.generateQuedu); //ok
router.post('/user/course/quedu/new', UserController.createPersonalQuedus); //ok
router.post('/user/course/new', verificarToken, UserController.createCourse); //ok
router.get('/user/:userId/course/:courseId/quedus', verificarToken, UserController.getQuedusByCourseId); //ok
router.get('/user/:userId/lastQuedu', verificarToken, UserController.getLastQuedu); //ok
router.put('/user/quedu/update', verificarToken, UserController.updateQuedu); //ok
router.get('/user/quedu/:userId/:courseId/:queduId', verificarToken, UserController.getQueduByIds); //ok
router.delete('/user/course/delete', verificarToken, UserController.deleteCourse); //ok
router.put('/user/course/update', verificarToken, UserController.updateCourse); //ok
router.get('/user/allQuedus/:id', verificarToken, UserController.listAllQuedusFormatted); //ok


router.get('/user/:id/quedus/:queduId', verificarToken, UserController.getPersonalQueduById);
router.post('/user/subscribeTo', verificarToken, UserController.subscribeToCommunity);
router.post('/user/shareQuedu', verificarToken, UserController.sharePersonalQuedu);



module.exports = router;