// import module `mongoose`
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// defines the schema for collection `posts`
var PostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: false
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
    },
    comments: {
        type: Schema.ObjectId,
        ref: 'Comment'
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Post', PostSchema);