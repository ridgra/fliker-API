const express = require('express');
const router = express.Router();
const publicFeed = require('./public-feed');

router.use('/public-feed', publicFeed)

module.exports = router;
