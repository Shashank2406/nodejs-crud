var User = require('../models/user');

exports.postUsers = function (req, res) {
    if (req && Object.keys(req.body).length === 4) {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            phone_number: req.body.phone_number,
            created_at: new Date(),
            updated_at: ""
        });
        user.save(function (err, response) {
            if (err) {
                return res.json(req, res, err);
            }
            delete response.__v;
            res.json({
                status: true,
                body: response
            })

        });
    } else {
        res.status(400);
        res.json({
            status: false,
            message: "Invalid Data"
        })
    }

};


exports.getUsers = function (req, res) {
    console.log(new Date().toUTCString());
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        res.json({
            status: true,
            data: response
        });
    })
}



exports.updateUsers = function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }
        if (user && req.body && req.body.username) {
            var username = req.body.username;
            var phone_number = req.body.phone_number;
            var email = req.body.email;
            var name =  req.body.name;
            user.email = email;
            user.name = name;
            user.username = username;
            user.phone_number = phone_number;
            user.updated_at = new Date();

            user.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    status: true,
                    data: response
                });
            })
        } else {
            res.status(400);
            res.json({
                status: false,
                message: "Failed to update"
            });
        }

    })
}

exports.deleteUsers = function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            User.remove({ _id: id }, function (err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    status: true,
                });
            })
        } else {
            res.status(400);
            res.json({
                status: false,
                message: "User doesn't exist"
            });
        }

    })
}

exports.idsearch = function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            res.json(user);
        }
        else {
            res.json({
                status: false,
                message: "User doesn't exist"
            });
        }
    })
}

exports.regexsearch = function (req, res) {
    var reg = req.params.reg;
    regexp = new RegExp(reg);
    User.find({ name: regexp }, function (err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            res.json({
                status: true,
                data: user
            });
        }
        else {
            res.json({
                status: false,
                message: "User doesn't exist"
            });
        }
    })
}



