const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const api = require('./api');
const config = require('../config');

const app = express();

config.env.dev && app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', function (req, res) {
  res.json({
    message: `Welcome to ${config.title}! 👻`,
  });
});

app.use(api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
