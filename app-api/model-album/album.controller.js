// Band Model Controller

var aws = require('aws-sdk');
var Album = require('./album-model.js');

// AWS ACCESS
var AWS_ACCESS_KEY;
var AWS_SECRET_KEY;
var S3_BUCKET;

// Create Album Image Url
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
// Create Album
module.exports.create = function(req, res) {

    var entry = new Album({
        name: req.body.name,
        tracks: req.body.tracks
    })
    Album.create(entry);
    res.status(200).send(entry);
};