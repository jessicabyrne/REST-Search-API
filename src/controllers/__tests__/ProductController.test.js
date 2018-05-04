import { productids } from '../../productids';
const server = require('../../server');

jest.mock('request-promise', () => jest.fn());
const requestPromise = require('request-promise');

describe('Test our api call', () => {
  it('should response the GET method', async () => {
    requestPromise
      .mockImplementation(() => {
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
    const res = await server.inject({
      method: 'GET',
      url: '/api/productids/backpack'
    });

    expect(res.result).toEqual([2]);
    expect(res.result).toBeInstanceOf(Array);
    expect(res.statusCode).toBe(200);
  });

  it('tests error with async/await throwing a specific error', async () => {
    requestPromise.mockImplementation(() => {});
    server.inject({ method: 'GET', url: '/api/productids/backpack' }, res => {
      expect(res.statusCode).toBe(404);
    });
  });

  it('tests error with async/await to get default error code', async () => {
    requestPromise.mockImplementation(() => {
      throw {};
    });
    server.inject({ method: 'GET', url: '/api/productids/backpack' }, res => {
      expect(res.statusCode).toBe(500);
    });
  });
});
