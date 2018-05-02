/**
 * Controller for products list
 */
const productIdArray = require('../productids.js');
const url = require('../../config/default.json'); //with a larger project, keep config with all the routes to reference
const http = require('http');
const requestPromise = require('request-promise');

const getProduct = () => {
  const productIds = productIdArray.productids.join();
  return requestPromise(url.walmartURL + productIds + url.apiKey);
};
console.log(productIdArray)
exports.getProducts = async (req, res) => {
  const keyword = req.params.keyword;
  let response;
  try {
    response = await getProduct();
    const itemsObject = JSON.parse(response); //convert string to JSON object
    const items = itemsObject.items; //get the array to iterate over
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
