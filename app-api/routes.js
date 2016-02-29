'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./data.controller');

// Routes
router.post('/add', controller.create);

router.post('/login', controller.login);

router.get('/sign_s3', controller.signed);

module.exports = router;