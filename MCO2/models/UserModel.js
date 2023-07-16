// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
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
        data: Buffer,
        contentType: String
    },
    banner: {
        data: Buffer,
        contentType: String
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);