const request = require('supertest');
const server = require('../../server');

jest.mock('request-promise', () => jest.fn());
const requestPromise = require('request-promise');

describe('Test our api call', () => {
  it('should respond to the GET method', async () => {
    requestPromise
      .mockImplementation(() => {
        return JSON.stringify({
          items: [
            {
              itemId: 1,
              longDescription: 'No keyword here'
            }
          ]
        });
      })
      .mockImplementationOnce(() => {
        return JSON.stringify({
          items: [
            {
              itemId: 2,
              longDescription: 'This has the word backpack in it!'
            }
          ]
        });
      });
    const res = await request(server).get('/api/productids/backpack');
    expect(res.text).toEqual('[2]');
    expect(res.body).toBeInstanceOf(Array);
    expect(res.statusCode).toBe(200);
  });

  it('tests error with async/await throwing a specific error', async () => {
    requestPromise.mockImplementation(() => {
      throw { status: 404 };
    });
    const res = await request(server).get('/api/productids/backpack');
    expect(res.statusCode).toBe(404);
  });

  it('tests error with async/await to get default error code', async () => {
    requestPromise.mockImplementation(() => {
      throw {};
    });
    const res = await request(server).get('/api/productids/backpack');
    expect(res.statusCode).toBe(500);
  });
});
