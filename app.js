// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });;

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

routes = require('./routes/index')
app.use('/api', routes);

// Use environment defined port or 8080
var port = process.env.PORT || 8080;

// Start the server
// app.listen(port);
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('Server Running at PORT: ' + port);