var express = require('express')
var router = express.Router()

var User = require('./userModel');
var _ = require('lodash');
var verifyToken = require('../verifyToken')
var dotEnv = require("dotenv").config()
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var dotEnv=require("dotenv");
 dotEnv.config();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var verifyToken = require('../verifyToken')


exports.params = function (req, res, next, id) {
    console.log("DEBUG:: In Id:" + id)
    User.findById(id)
        .then(function (user,err) {
        .then(function (user, err) {
            console.log("DEBUG:: User:" + user)
            console.log("DEBUG:: Error:" + err)
            // !user.name
            if (!user) {
                next(new Error('No user with id :' + id));
            } else {
                console.log("Id is :"+id);
                req.user = user;
                console.log("User is :"+id)
                next();
            }
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {
    console.log('In Users')
    User.find({})
        .then(function (users) {
            res.json(users);
        }, function (err) {
            next(err);
        });

};

exports.getOne = function (req, res, next) {
   console.log("DEBUG:: users getOne ")
    var user = req.user;
    res.json(user);
};

exports.put = function (req, res, next) {
   console.log("DEBUG:: users put ")
    var user = req.user;
    var update = req.body;
    _.merge(user, update);

    user.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function (req, res, next) {
    console.log("DEBUG:: users post")
    var newUser = req.body;
    User.create(newUser)
        .then(function (users) {
            res.json(users);
        }, function (err) {
            next(err);
        });
};

exports.delete = function (req, res, next) {
    console.log("DEBUG:: users delete")
    req.user.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

//Register User
exports.register=("/register",(req,res)=>{

        //encrypt password before save
        var hashedPassword=bcrypt.hashSync(req.body.password, 8);
        req.body.password=hashedPassword;
console.log('creating user');
console.log('body of request'+JSON.stringify(req.body));
        var newUser=new User(req.body);
        
        User.create(req.body)
        .then((user)=>{
console.log('creating token for user '+user._id);
            // create jwt token
            var token = jwt.sign({ id: user._id },
                                    process.env.JWT_SECRET, {
                                    expiresIn: 86400 // expires in 24 hours
                                });
            console.log(token);
            res.status(200).send({auth:true,token: token});
        })
        .catch((err)=>{
            console.log('failed to log'+JSON.stringify(err));
            res.status(500).send(err);
        })
})
exports.register = function (req, res) {
    //encrypt password before save
    console.log("DEBUG:: In Register Post ")
    console.log("Register:: " + req + res)
    console.log(req.body.password)
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;
    var newUser = new User(req.body);
    newUser.save()
        .then((user) => {

            //create jwt token
            var token = jwt.sign({ id: user._id },
                process.env.JWT_SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
            console.log(token);
            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

//Login User
exports.login = function (req, res) {
    console.log("DEBUG:: In Login")
    // console.log("DEBUG :: Reg Body " + req.body)
    console.log(req.body.username);
    console.log("DEBUG :: Reg Body " + req.body)
        User.findOne({
            username: req.body.username
        })
            .then((user) => {
                if (!user) return res.status(404).send('No user found.');
                console.log("DEBUG :: User is : " + user)
                //Check password matches
                var hashedPassoword = bcrypt.hashSync(user.password, 8)
                // Need To Check this is correct or not 
                var passwordIsValid = bcrypt.compareSync(req.body.password, hashedPassoword);
                console.log("DEBUG :: Req Password : " + req.body.password)
                console.log("DEBUG :: User Pass :" + user.password)
                console.log("DEBUG :: Password is Valid " + passwordIsValid)
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                console.log("DEBUG :: Token is " + token)
                console.log(JSON.stringify(user));
                res.status(200).send({ auth: true, token: "token" });
                res.status(200).send({ auth: true, token: token });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Unable to login. Try again later"
                });
            })
    }

// router.route("/me")
// .get(verifyToken,(req,res)=>{
//     db.User.findById(req.userId,{password:0})
//    .then((user)=>{
//         res.status(200).send(user);
//     })
//     .catch((err)=>{
//         res.status(500).send({
//             message:"Unable to retrieve user" + JSON.stringify(err)
//         });
//     })
// })

//Logout
// router.get('/logout', function(req, res) {
//     res.status(200).send({ auth: false, token: null });
// });
// module.exports=router;
exports.me = (verifyToken, (req, res, next) => {
    console.log("DEBUG:: /id/me ")
        User.findById(req.userId, { password: 0 })
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Unable to retrieve user" + JSON.stringify(err)
                });
            })
})

//Logout
exports.logout = ("/logout", (req, res) => {
    console.log("DEBUG:: User Logout Requested ")
    res.status(200).send({ auth: false, token: null });
});

