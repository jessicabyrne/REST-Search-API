/**
 * Controller for products list
 */

const url = require('../../config/default.json'); //with a larger project, keep config with all the routes to reference
//const url = 'http://api.walmartlabs.com/v1/items/';
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
  return requestPromise(url.walmartURL + productid + suffix);
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
  const keyword = req.params.keyword;
  let productIds = [];

  for (let id of productids) {
    let response;

    try {
      response = await getProduct(id);
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ status: err.status, message: err.message });
    }
    await delay(200); //delay in milliseconds
    const productObject = JSON.parse(response); //convert string to JSON object
    const longDescription = productObject['longDescription']; //get the long description
    const itemId = productObject['itemId'];

    //check if keyword is in description, if it is, add id to array
    if (longDescription.toLowerCase().indexOf(keyword) >= 0) {
      productIds = productIds.concat(itemId);
    }
  }
  res.send(productIds);
};
