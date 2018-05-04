// call the packages we need
'use strict';

const Hapi = require('hapi');
const products = require('./controllers/ProductController');

const server = Hapi.server({
  port: 8080,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/api/productids/{keyword}',
  handler: products.getProducts
});

const init = async () => {
  await server.start();
  console.log(`Magic happens on port: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
