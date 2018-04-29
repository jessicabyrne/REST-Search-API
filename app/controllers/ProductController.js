/**
 * Controller for products list
 */

//const url = require('config').get('walmartURL');
const url = 'http://api.walmartlabs.com/v1/items/';
const suffix = '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj';
const http = require('http');
const Promise = require('request-promise');
const productids = [
  14225185,
  14225186,
  14225188,
  14225187,
  39082884,
  30146244,
  12662817,
  34890820,
  19716431,
  42391766,
  35813552,
  40611708,
  40611825,
  36248492,
  44109840,
  23117408,
  35613901,
  42248076
];

const getProduct = async productid => {
  return Promise(url + productid + suffix);
};

exports.getProducts = async () => {
  let request;
  for (let i = 0; i <= productids.length; i++) {
    console.log(productids[i]);
    request = await getProduct(productids[i]);
    console.log(request);
  }
};
