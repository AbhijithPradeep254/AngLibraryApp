const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/library');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {type: String, unique: true},
        email: String,
        password: String
    }
);

userSchema.plugin(passportLocalMongoose);
var userData = mongoose.model('userdatas', userSchema, 'userdatas');

module.exports = userData;