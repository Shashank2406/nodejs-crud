// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String},
    name: {type: String},
    phoneNumber: {type: Number},
    password: {type: String},
    notes:{type: Array},
    socialId: {type: String},
    createdDate: {type: Date, default: Date.now},
    updatedDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);