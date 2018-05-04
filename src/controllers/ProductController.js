/**
 * Controller for products list
 */

const url = require('../../config/default.json'); //with a larger project, keep config with all the routes to reference
const http = require('http');
const requestPromise = require('request-promise');
const exportedProductIds = require('../productids');
const productIdArray = exportedProductIds.productids;

const getProduct = async productid => {
  return requestPromise(url.walmartURL + productid + url.apiKey);
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
  for (let id of productIdArray) {
    let response;

    try {
      response = await getProduct(id);
    } catch (err) {
      return res.response(err).code(err.status || 500);
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
  return productIds;
};
