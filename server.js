// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening.'); // do logging
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to the api!' });
});

// more routes for our API will happen here
// on routes that end in /backpacks
// ----------------------------------------------------
router
  .route('/backpacks')
  // http://api.walmartlabs.com/v1/items/14225185?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj
  .get(function(req, res) {
    Backpack.find(function(err, backpacks) {
      if (err) res.send(err);
      res.json(backpacks);
    });
  });

// on routes that end in /backpacks/:backpack_id
// ----------------------------------------------------
router
  .route('/backpacks/:backpack_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/backpacks/:backpack_id)
  .get(function(req, res) {
    Bear.findById(req.params.backpack_id, function(err, backpack) {
      if (err) res.send(err);
      res.json(backpack);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
