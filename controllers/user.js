var User = require('../models/user');
var md5 = require('md5');


exports.authenticateUser = function (req, res) {
    if (req.body.socialId) {
        User.findOne({ socialId: socialId }, function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    message: err
                });
            }
            if ((response || []).length === 0) {
                res.json({
                    status: false,
                    message: "Wrong Social Id"
                });
            } else {
                res.json({
                    status: true,
                    id: response._id
                })
            }

        })
        return;
    }
    var crpyt = md5(req.body.password);
    var requestUsername = req.body.username;
    var requestPassword = crpyt;
    User.findOne({ username: requestUsername, password: requestPassword }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                message: err
            });
        }
        if ((response || []).length === 0) {
            res.json({
                status: false,
                message: "Wrong Username / Password"
            });
        } else {
            res.json({
                status: true,
                id: response._id
            })
        }

    })
};

exports.postUsers = function (req, res) {
    if (req && Object.keys(req.body).length === 4) {
        var requestUsername = req.body.username;
        User.findOne({ username: requestUsername }, function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    message: err
                });
            }
            if ((response || []).length === 0) {
                var user = new User({
                    username: req.body.username,
                    password: md5(req.body.password),
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    socialId: req.body.socialId || '',
                    createdDate: new Date(),
                    updatedDate: ""
                });
                user.save(function (err, response) {
                    if (err) {
                        return res.json(req, res, err);
                    }
                    delete response.__v;
                    res.json({
                        status: true,
                        body: { id: response._id }
                    })

                });
            } else {
                res.status(400);
                res.json({
                    status: false,
                    message: "User Already Exists"
                })
            }

        })

    } else {
        res.status(400);
        res.json({
            status: false,
            message: "Invalid Data"
        })
    }

};

exports.putNotes = function (req, res) {
    var id = req.params.id;
    if (req && Object.keys(req.body).length === 1) {
        User.findOne({ _id: id }, function (err, user) {
            if (err) {
                res.json(err);
            }
            if (user && req.body && req.body.notes) {
                var validationFlag = false
                req.body.notes.map((item) => {
                    item.id = uuidv4();
                    item.createdDate = new Date();
                    if (item.title && item.data) {
                        user.notes.push(item);
                    } else {
                        validationFlag = true
                    }
                })
                if (validationFlag) {
                    res.status(400);
                    res.json({
                        status: false,
                        message: "Failed to update"
                    });
                } else {
                    user.save(function (err, response) {
                        if (err) {
                            res.json(err);
                        }
                        res.json({
                            status: true,
                            data: response.notes
                        });
                    })
                }

            } else {
                res.status(400);
                res.json({
                    status: false,
                    message: "Failed to update"
                });
            }

        })
    } else {
        res.status(400);
        res.json({
            status: false,
            message: "Invalid Data"
        })
    }

};

exports.getNotes = function (req, res) {
    try {
        var id = req.params.id;
        User.findOne({ _id: id }, function (err, response) {
            if (err) {
                return res.json(req, res, err);
            }
            if (response && Object.keys(response).length) {
                res.json({
                    status: true,
                    response: response.notes
                });
            } else {
                res.status(400);
                res.json({
                    status: false,
                    message: "User doesn't exist"
                });
            }

        })
    } catch (error) {
        res.status(400);
        res.json({
            status: false,
            message: "User doesn't exist"
        });
    }


};


exports.getUsers = function (req, res) {
    console.log(new Date().toUTCString());
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        if (response && response.length) {
            updatedData = response.map((item) => {
                updatedItem = {};
                updatedItem.username = item.username;
                updatedItem.name = item.name;
                updatedItem.phoneNumber = item.phoneNumber;
                updatedItem.createdDate = item.createdDate;
                return updatedItem;
            })
            res.json({
                status: true,
                data: updatedData
            });
        } else {
            res.status(400);
            res.json({
                status: false,
                message: "No User exist"
            });
        }
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
            var phoneNumber = req.body.phoneNumber;
            var password = md5(req.body.password);
            var name = req.body.name;
            user.password = password;
            user.name = name;
            user.username = username;
            user.phoneNumber = phoneNumber;
            user.updatedDate = new Date();

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


exports.deleteNote = function (req, res) {
    var id = req.params.id;
    var noteId = req.params.noteId
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            if (user.notes && user.notes.length) {
                var dataFlag = false;
                user.notes = user.notes.filter((item) => {
                    if (item.id === noteId) {
                        dataFlag = true;
                        return false
                    }
                    return true
                })
            }
            if (dataFlag) {
                user.save(function (err, response) {
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
                    message: "Note not found"
                });
            }


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



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}