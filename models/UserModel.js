
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    icon: {
        // data: Buffer,
        // contentType: String
        type: String,
        required: true
    },
    banner: {
        // data: Buffer,
        // contentType: String
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);