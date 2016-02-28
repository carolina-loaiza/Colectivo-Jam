'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./data.controller');

// Routes
router.post('/add', controller.create);

router.post('/login', controller.login);

module.exports = router;