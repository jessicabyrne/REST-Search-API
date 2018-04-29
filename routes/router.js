/**
 * router.js - api routes are configured in this script
 */
//http://api.walmartlabs.com/v1/items/14225185format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj

module.exports = app => {
  const url =
    'http://api.walmartlabs.com/v1/items/' +
    keyword +
    'format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj';

  /**
   * Walmart API
   */

  app.post(url, product.findOne);
};
