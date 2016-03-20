'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./model-band/band.controller');
var albumCtrl = require('./model-album/album.controller');

// Routes
router.post('/add', controller.create);

router.post('/login', controller.login);

router.post('/add/album', controller.addAlbum);

router.get('/:band_name', controller.getData);

router.post('/album/new', albumCtrl.create);

router.get('/album/:album_name', albumCtrl.getData);

router.get('/all/albums', albumCtrl.getAll);

module.exports = router;