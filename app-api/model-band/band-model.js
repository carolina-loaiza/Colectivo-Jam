'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*crypto*/
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var bandSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    albums: [{type: mongoose.Schema.ObjectId, ref: 'Album'}],
    email: String,
    password:  { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    image: String,
    intro: String,
    genres : Array,
    links: Object
});

bandSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

bandSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Band', bandSchema);