// Band Model Controller


var Album = require('./album-model.js');

// Create Album
module.exports.create = function(req, res) {
    console.log(req.body)
    var entry = new Album({
        name: req.body.name,
        owner: req.body.owner,
        tracks: req.body.tracks,
        cover: req.body.cover,
        song: req.body.song,
        genres : req.body.genres
    })
    Album.create(entry);
    res.send(entry);
};

module.exports.getData = function(req, res) {

    Album.findOne({name: req.params.album_name})
    .populate('owner', 'name')
    .exec(function(err, album) {
        if(album === null) {
            res.status(500).send("Not found");
        }else {
            res.send(album);
        }
    })
};

module.exports.getAll = function(req, res) {
    console.log(req.body);
    Album.find().populate('owner', 'name').exec(function(err, album) {
        if(album === null) {
            res.status(500).send("Not found");
        }else {
            res.send(album);
        }
    })
};