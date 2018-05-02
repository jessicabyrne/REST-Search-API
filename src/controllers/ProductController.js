/**
 * Controller for products list
 */

//const url = require('../../config/default.json'); //with a larger project, keep config with all the routes to reference
const url = 'http://api.walmartlabs.com/v1/items?ids=';
const suffix = '&apiKey=kjybrqfdgp3u4yv2qzcnjndj';
const http = require('http');
const requestPromise = require('request-promise');
const productIdArray = [
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

const getProduct = () => {
  const productIds = productIdArray.join();
  return requestPromise(url + productIds + suffix);
};

exports.getProducts = async (req, res) => {
  const keyword = req.params.keyword;
  let response;
  try {
    response = await getProduct();
    const itemsObject = JSON.parse(response); //convert string to JSON object
    const items = itemsObject['items']; //get the array to iterate over
    let productIds = [];
    for (let item in items) {
      if (items[item].longDescription.toLowerCase().indexOf(keyword) >= 0) {
        productIds = productIds.concat(items[item].itemId);
      }
    }
    res.send(productIds);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
};
