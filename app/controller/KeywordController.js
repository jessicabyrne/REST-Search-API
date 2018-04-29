/**
 * Controller for products list
 */

const url = require('config').get('url');
const http = require('http');

const options = {
  hostname: url,
  port: 8080,
  path: '/backpacks',
  method: 'GET'
};

const req = http.request(options, res => {
  res.on('data', chunk => {
    console.log('Im here!');
    console.log(`${chunk}`);
  });
});

req.on('error', e => {
  console.error(e);
});
req.end();
