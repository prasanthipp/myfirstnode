var Roommate = require('./roommateModel');
var _ = require('lodash');
var express = require("express");

// var verifyToken = require('../verifyToken')

exports.params = function (req, res, next, id) {
    console.log("DEBUG:: API:-> ")
    console.log("Id :"+ id)
    Roommate.findById(id)
        .then(function (roommate, err) {
            console.log("DEBUG:: Roommate :" + roommate)
            console.log("DEBUG:: Error :" + err)
             // console.log("DEBUG ::" + req)
            console.log("DEBUG ::" )
            if (!roommate) {
                next(new Error('No user with that id'));
            } else {
                req.roommate = roommate;
                next();
            }
        }, function (err) {
            next(err);

        });
}
exports.area_city = function (req, res, next, area, city) {
    console.log("DEBUG:: In Area City ")
    console.log("DEBUG:: Area :"+ area)
    console.log("DEBUG:: City :" + city )
    console.log("Res: "+ res)
    Roommate.find({$or : [{area:area},{city:city}]})
        .then(function (roommate, err) {
            console.log("DEBUG:: Roommate :" + roommate)
            console.log("DEBUG:: Error :" + err)
            console.log("DEBUG ::" )
            if (!roommate) {
                console.log("In If Loop ")
                console.log("Error: ")
                next(new Error('No Roommates :with area " + area " city " + city '));
            } else {
                console.log("In Else")
                req.roommate = roommate;
                next();
            }
        }, function (err) {
            next(err);

        });
}


exports.get = function (req, res) {
    console.log("DEBUG:: API :-> /roomates/, Method : GET , get ")
    Roommate.find({})
        .then((requests) => {
            res.status(200).send(requests);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

// Needs Fix
exports.get_area_city = function (req,res) {
    console.log("DEBUG:: API :-> users/:area/:city, Method: GET, get_area_city")
    var roommate = req.roommate;
    res.json(roommate);
 };

exports.getOne = function (req, res, next) {
   console.log("DEBUG:: users getOne ")
    var roommate = req.roommate;
    res.json(roommate);
};

exports.put = function (req, res) {
    console.log("DEBUG:: In Put")
    var newRequest = new Roommate(req.body);
    console.log("DEBUG:: request" + newRequest)
    newRequest.save()
        .then((request) => {
           res.status(200).send(request);
        })
       .catch((err) => {
           console.log('errOccured');
           res.status(500).send(err);
       })
};

exports.post = function (req, res, next) {
    var newRoommate = req.body;
    console.log("New Roommate: "+ newRoommate);
    Roommate.create(newRoommate)
        .then(function (roommates) {
            res.json(roommates);
        }, function (err) {
            next(err);
        });
};


exports.delete = function (req, res, next) {
    console.log("DEBUG:: users delete")
    Roommate.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};