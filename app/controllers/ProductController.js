/**
 * Controller for products list
 */

//const url = require('config').get('walmartURL');
const url = 'http://api.walmartlabs.com/v1/items/';
const suffix = '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj';
const http = require('http');
const requestPromise = require('request-promise');
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
  return requestPromise(url + productid + suffix);
};

//write a simple function to delay call
const delay = (t, val) => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(val);
    }, t);
  });
};

exports.getProducts = async (req, res) => {
  const keyword = 'backpack';
  let productObject;
  let productInformation = [];
  let selectedProducts = [];

  for (let id of productids) {
    productObject = await getProduct(id);
    await delay(100);
    productObject = JSON.parse(productObject); //convert string to JSON object
    shortDescription = productObject['shortDescription']; //get the short description
    productId = productObject['itemId'];
    if (shortDescription.search(keyword) > 0) {
      selectedProducts = selectedProducts.concat(productId);
    }
    productInformation.push(productObject);
  }
  res.send(selectedProducts);
};
