var Roommate = require('./roommateModel');
var _ = require('lodash');
var express = require("express");

var verifyToken = require('../verifyToken')

// exports.params = function (req, res, next, id) {
//     Roommate.findById(id)
//         .then(function (post) {
//             if (!roommate) {
//                 next(new Error('No user with that id'));
//             } else {
//                 req.roommate = roommate;
//                 next();
//             }
//         }, function (err) {
//             next(err);

//         });
// }

exports.get = function (req, res) {
    Roommate.find({})
        .then((requests) => {
            res.status(200).send(requests);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

// exports.get ("/:area/:city", (req,res)=>{
//     var area=req.params.area;
//     var city=req.params.city;

//     Roommate.RoommateRequest.find({$or : {area:area,city:city}})
//     .then((requests)=>{
//         res.status(200).send(requests);
//     })
//     .catch((err)=>{
//         res.status(500).send(err)
//     })
// });



exports.post = function (req, res) {
    console.log("In Post")
//    console.log("Verify Token:" + verifyToken)
    console.log("Request : " + req.body)
    console.log("Response : " + res)
    req.body.userId = req.userId;
    console.log("Reg Body: " + req.body)

    var newRequest = new Roommate(req.body);
    
    newRequest.save()
       .then((request) => {
           res.status(200).send(request);
       })
       .catch((err) => {
           console.log('errOccured');
          res.status(500).send(err);
       })
};
// exports.post = function (req, res, next) {
//     var newRoommate = req.body;
//     console.log("New Roommate: "+ newRoommate);
//     Roommate.create(newRoommate)
//         .then(function (roommates) {
//             res.json(roommates);
//         }, function (err) {
//             next(err);
//         });
// };

// exports.get("/myrequests",verifyToken,(req,res)=>{
//     var loggedInUserId=req.userId;
//         console.log("Logged In User ID:" + loggedInUserId)

//         Roommate.RoommateRequest.find({userId:loggedInUserId})
//         .then((requests)=>{
//             res.status(200).send(requests);
//         })
//         .catch((err)=>{
//             res.status(500).send(err)
//         })
// });



