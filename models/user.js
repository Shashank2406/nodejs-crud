// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String},
    name: {type: String},
    email: {type: String},
    phone_number: {type: Number},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);