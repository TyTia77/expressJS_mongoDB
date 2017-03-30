const express = require('express');
const mongoose = require('mongoose');

// used to get body data from requests
const bodyParser = require('body-parser');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// must go before initialize routes, it will attach it to the body object
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({
        error: err.message
    });
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
