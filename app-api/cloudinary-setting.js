var cloudinary  = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
 
module.exports.uploadImage = function(req, res) {
    console.log(req.body)
    console.log(req.files)
    if(req.files.file) {
        cloudinary.uploader.upload(req.files.file.path, function(result) {
            if (result.url) {
                res.send(result.url);
            } else {
                res.json(error);
            }
        });
    } else {
        res.send("no req.files.file");
    }
};


