const express = require('express');
const CommunityController = require('../controllers/CommunityController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/communities', verificarToken, CommunityController.getCommunity);
router.post('/community/new', verificarToken, CommunityController.createCommunity);
router.get('/community/:communityId', verificarToken, CommunityController.getCommunityById);

module.exports = router;