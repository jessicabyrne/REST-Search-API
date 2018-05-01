const request = require('supertest');
const server = require('../../server');
const requestPromise = require('request-promise');

jest.mock('request-promise', () => {
  return jest
    .fn(() => {
      return JSON.stringify({
        itemId: 1,
        longDescription: 'No keyword here'
      });
    })
    .mockImplementationOnce(() => {
      return JSON.stringify({
        itemId: 2,
        longDescription: 'This has the word backpack in it!'
      });
    });
});

describe('Test our api call', () => {
  test('It should response the GET method', async () => {
    const res = await request(server).get('/api/productids/backpack');
    expect(res.statusCode).toBe(200);
  });
});
