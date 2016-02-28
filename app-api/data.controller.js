// List controller

var Band = require('./model/band-model.js')

// get the provincias resource
module.exports.create = function(req, res) {

    var entry = new Band({
        name: req.body.name,
        email: req.body.email,
        password:  req.body.password,
        image: req.body.image,
        intro: req.body.intro,
        website: req.body.website,
        telephone: req.body.telephone
    })
    Band.create(entry);
    res.status(200).send(entry);
};

module.exports.login = function(req, res) {

    Band.findOne({name: req.body.name}, function(err, user) {
        if(user === null) {
            res.status(500).send("Band not found");
        }else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(err) {
                    res.status(500).send("Password dont match")
                }
                if (isMatch) {
                    res.json(user);
                }
            })
        }
    })
};