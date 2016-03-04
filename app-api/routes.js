'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./model-band/band.controller');
var albumCtrl = require('./model-album/album.controller');

// Routes
router.post('/add', controller.create);

router.post('/login', controller.login);

router.post('/add/album', controller.addAlbum);

router.post('/album/new', albumCtrl.create);

router.get('/sign_s3', controller.signed);

module.exports = router;