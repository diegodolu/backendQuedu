const express = require('express');
const CommunityController = require('../controllers/CommunityController');

const router = express.Router();

router.get('/communities', CommunityController.getCommunity);
router.post('/community/new', CommunityController.createCommunity);

module.exports = router;