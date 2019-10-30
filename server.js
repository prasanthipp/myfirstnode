var express = require('express');
var app= express();

// var cors = require('cors');

const bodyParser = require('body-parser');
var api = require('./api/api'); //router
 app.use(bodyParser.urlencoded({extended : false}));
 app.use(bodyParser.json());

 //app.use(cors());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
//setup api
app.use('/api',api);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/myfirstnode");

const port = process.env.NODE_ENV === 'production' ?(process.env.PORT || 80) : 4006;
const server=app.listen(port, () => {
    console.log('Server listening in port' + port);
  });
module.exports = app;