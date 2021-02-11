const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');
const Redis = require('ioredis');
const redis = new Redis();

router.get('/', async function (req, res, next) {
  try {
    const { tags } = req.query;
    const limit = +req.query.limit;
    const page = +req.query.page ?? 1;

    const tagsQuery = tags ? `&tags=${tags}` : '';

    if (tagsQuery) {
      const { data } = await axios.get(`${config.api.flickrURL}${tagsQuery}`);
      res.status(200).json(data);
    }

    let cached = await redis.get('data');
    if (!cached) {
      const { data } = await axios.get(config.api.flickrURL);
      await redis.set('data', JSON.stringify(data), 'EX', 60);
      cached = data;
    } else {
      cached = JSON.parse(cached);
    }

    if (limit) {
      cached.items = await cached.items.splice((page - 1) * limit, limit);
      if (!cached.items.length) {
        throw { name: 'NotFound' };
      }
    }

    res.status(200).json(cached);
  } catch (error) {
    config.env.dev && console.log(error);
    next(error);
  }
});

module.exports = router;
