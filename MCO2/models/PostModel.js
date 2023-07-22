// import module `mongoose`
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// defines the schema for collection `posts`
var PostSchema = new mongoose.Schema({
    
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
        type: Boolean,
        required: true
    },
    dirvotes: {
        type: Boolean,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        // type: Schema.Types.ObjectId,
        // ref: 'Comment'
        {
            
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
                type: Boolean,
                required: true
            },
            dirvotes: {
                type: Boolean,
                required: true
            },
            deleted: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Post', PostSchema);