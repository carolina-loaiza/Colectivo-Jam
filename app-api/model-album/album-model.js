'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    tracks: Array
});

module.exports = mongoose.model('Album', albumSchema);