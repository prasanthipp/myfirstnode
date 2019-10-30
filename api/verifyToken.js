// var jwt = require('jsonwebtoken');

// var dotEnv=require("dotenv");
// //dotEnv.load();

// function verifyToken(req, res, next) {
//   var token = req.headers['x-access-token'];
//   if (!token)
//     return res.status(403).send({ auth: false, message: 'No token provided.' });
  
//   jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//     // if everything good, save to request for use in other routes
//     req.userId = decoded.id;
//     next();
//   });
// }

// module.exports = verifyToken;


var jwt = require('jsonwebtoken');

var dotEnv=require("dotenv").config();

function verifyToken(req, res, next) {
  console.log("DEBUG:: VerfiyToken requested ")
  console.log("DEBUG:: Request" + req)
  var token = req.headers['x-access-token'];
  console.log(token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.'});
  
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;