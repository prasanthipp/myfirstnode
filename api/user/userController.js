var User = require('./userModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
   console.log("DEBUG:: In Id:" + id )
    User.findById(id)
        .then(function (user, err) {
            console.log("DEBUG:: User:" + user)
            console.log("DEBUG:: Error:" + err)
            // !user.name
            if (!user) {
                next(new Error('No user with id :' + id));
            } else {
                req.user = user;
                next();
            }
        }, function (err) {
            next(err);
        });
}

exports.get = function (req, res, next) {
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
