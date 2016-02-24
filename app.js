'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');

app.use(express.json());
//returns middleware to parse incoming json data from a request

//global middleware
app.post('/', badges.save, badges.send);


//new route
app.get('/badges', badges.get);

app.listen(8000);
//when the app is ran, the process is now running
