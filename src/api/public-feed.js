const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async function (req, res, next) {
  try {
    const data  = await axios.get(config.api.flickrURL);
    res.status(200).json(data);
  } catch (error) {
    // console.error(error);
    next(error)
  }
});

module.exports = router;
