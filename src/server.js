// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const routes = require('./routes/router'); //importing route

const port = process.env.PORT || 8080; // set our port

// START THE SERVER
// =============================================================================

routes(app); //register the routes
app.listen(port, () => {
  console.log('Magic happens on port ' + port);
});
module.exports = app;
