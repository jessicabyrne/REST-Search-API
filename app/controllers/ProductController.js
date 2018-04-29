/**
 * Controller for products list
 */

//const url = require('config').get('walmartURL');
const url = 'api.walmartlabs.com';
const http = require('http');

const options = {
  hostname: url,
  path: '/v1/items/14225185?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj',
  method: 'GET',
  timeout: 10000
};

exports.findOne = (request, response) => {
  const req = http.request(options, res => {
    res.on('data', chunk => {
      response.send(chunk);
    });
  });
  req.on('error', e => {
    console.error(e);
  });
  req.end();
};
