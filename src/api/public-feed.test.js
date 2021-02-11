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
  });

  it('should be an array of items', async function () {
    const response = await supertest(app).get('/public-feed');
    expect(Array.isArray(response.body.items)).toBe(true);
  });
});

describe('GET /public-feed?tags=mountain', function () {
  it('should respond with "Recent Uploads tagged mountain"', async function () {
    const response = await supertest(app)
      .get('/public-feed?tags=mountain')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe('Recent Uploads tagged mountain');
  });
});

describe('GET /public-feed?tags=', function () {
  it('should respond with "Uploads from everyone"', async function () {
    const response = await supertest(app)
      .get('/public-feed?tags=')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe('Uploads from everyone');
  });
});

describe('GET /public-feed?tags=mountain,misty,alaska,', function () {
  it('should respond with "Recent Uploads tagged mountain, misty and alaska"', async function () {
    const response = await supertest(app)
      .get('/public-feed?tags=mountain,misty,alaska')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe(
      'Recent Uploads tagged mountain, misty and alaska'
    );
  });
});

describe('GET /public-feed?tags=,,alaska,', function () {
  it('should respond with "Recent Uploads tagged alaska"', async function () {
    const response = await supertest(app)
      .get('/public-feed?tags=,,alaska')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe('Recent Uploads tagged alaska');
  });
});

describe('GET /public-feed?limit=', function () {
  it('should respond with "Uploads from everyone"', async function () {
    const response = await supertest(app)
      .get('/public-feed?limit=')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe('Uploads from everyone');
  });
});

describe('GET /public-feed?limit=3', function () {
  it('should respond with 3', async function () {
    const response = await supertest(app)
      .get('/public-feed?limit=3')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.items.length).toBe(3);
  });
});

let cases = [
  //[limit, page, index-limited, index-nolimit]
  [1, 1, 0, 0],
  [2, 2, 0, 2],
  [5, 3, 0, 10],
  [8, 2, 0, 8],
  [17, 2, 0, 17],
];

describe('GET /public-feed?page=x&limit=x', function () {
  test.each(cases)(
    'it should have the same value between noLimit and limited',
    async function (limit, page, indexLimited, indexNolimit) {
      const noLimit = await supertest(app)
        .get('/public-feed?')
        .expect('Content-Type', /json/)
        .expect(200);

      const limited = await supertest(app)
        .get(`/public-feed?page=${page}&limit=${limit}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(limited.body.items[indexLimited]).toMatchObject(
        noLimit.body.items[indexNolimit]
      );
    }
  );
});

describe('GET /public-feed?page=', function () {
  it('should respond with "Uploads from everyone"', async function () {
    const response = await supertest(app)
      .get('/public-feed?page=')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.title).toBe('Uploads from everyone');
  });
});

describe('GET /public-feed?page=3&limit=10', function () {
  it('should respond with 404', async function () {
    const response = await supertest(app)
      .get('/public-feed?page=3&limit=10')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
