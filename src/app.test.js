const supertest = require('supertest');

const app = require('./app');
const config = require('../config');

describe('GET /', () => {
  it('should respond with a message', async function () {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(`Welcome to ${config.title}! 👻`);
  });
});

const unmatchRoute = 'asdfg';

describe('GET /', () => {
  it('should respond with 404 status code', async function () {
    await supertest(app)
      .get('/' + unmatchRoute)
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
