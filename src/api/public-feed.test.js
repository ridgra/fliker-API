const supertest = require('supertest');

const app = require('../app');

describe('GET /public-feed', function () {
  it('should respond with a message', async function () {
    await supertest(app)
      .get('/public-feed')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should have properties', async function () {
    const response = await supertest(app).get('/public-feed');

    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('link');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('modified');
    expect(response.body).toHaveProperty('generator');
    expect(response.body).toHaveProperty('items');
    console.log(response)
  });


  it('should be an array of items', async function () {
    const response = await supertest(app).get('/public-feed');
    expect(Array.isArray(response.body.items)).toBe(true);
  });
});
