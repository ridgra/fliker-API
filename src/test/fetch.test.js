const request = require('supertest');
const app = require('../app');

// const request = require('supertest');
// const express = require('express');

// const app = express();

app.get('/', function(req, res) {
  res.status(200).json({ name: 'john' });
});

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/')
      // .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});