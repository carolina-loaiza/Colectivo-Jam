// Band Model Controller

var aws = require('aws-sdk');
var Band = require('./band-model.js');

// AWS ACCESS
var AWS_ACCESS_KEY;
var AWS_SECRET_KEY;
var S3_BUCKET;

// Create Band Image Url
module.exports.signed = function(req, res) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
            res.status(500).send("Error al subir la imagen");
        }else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            }
            res.json(return_data);
        }
    })
};
// Create Band
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
    console.log(req.body);
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