// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `comments`
var CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    clickvote: {
        data: Boolean,
        required: true
    },
    dirvotes: {
        data: Boolean,
        required: true
    },
    deleted: {
        data: Boolean,
        required: true
    },
    description: {
        data: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Comment', CommentSchema);