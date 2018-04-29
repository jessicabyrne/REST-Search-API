/**
 * router.js - api routes are configured in this script
 */

module.exports = app => {
  const products = require('../controllers/ProductController');
  const apiPrefix = '/api';

  /**
   * Product API
   */

  app.get(apiPrefix + '/products/findone/:keyword', products.findOne);
};
