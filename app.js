'use strict';

var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./app-api/routes.js');
var app = express();

var port = process.env.PORT || 3000;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection succese!');
});

app.use(morgan('dev'))
app.use(express.static('app'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/bands', routes);

/*
* Listen
*/
app.listen(port);
console.log("App listening on port " + port);
