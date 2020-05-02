'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/app'));

app.get('*', function(req, res){
  res.sendfile(__dirname + '/app/index.html');
});

app.listen(8080);
