// Band Model Controller


var Band = require('./band-model.js');

// Create Band
module.exports.create = function(req, res) {

    var entry = new Band({
        name: req.body.name,
        email: req.body.email,
        password:  req.body.password,
        image: req.body.image,
        intro: req.body.intro,
        genres : req.body.genres,
        links: req.body.links
    })
    Band.create(entry);
    res.status(200).send(entry);
};
// Log In Band
module.exports.login = function(req, res) {
    Band.findOne({name: req.body.name})
        .populate('albums')
        .exec(function(err, user) {
        if(user === null) {
            res.status(500).send("Band not found");
        }else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(err) {
                    res.status(500).send("Password dont match")
                }
                if (isMatch) {
                    user.password = undefined;
                    res.json(user);
                }
            })
        }
    })
};

module.exports.addAlbum = function(req, res) {
    Band.findOne({_id: req.body.id}, function (err, user){
        if(user === null) {
            res.status(500).send("Not found");
        }else {
            user.albums.push(req.body.album)
            user.save();
            res.send('todo bien');
        }
    })
};

module.exports.getData = function(req, res) {
    Band.findOne({name: req.params.band_name})
    .populate('albums')
    .exec(function(err, band) {
        if(band === null) {
            res.status(500).send("Not found");
        }else {
            res.send(band);
        }
    })
};