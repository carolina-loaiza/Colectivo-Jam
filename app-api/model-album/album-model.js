'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    owner: [{type: mongoose.Schema.ObjectId, ref: 'Band'}],
    tracks: Array,
    cover: String,
    song: {name: String, link: String},
    genres : Array
});

module.exports = mongoose.model('Album', albumSchema);