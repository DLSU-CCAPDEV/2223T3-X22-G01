// import module `mongoose`
var mongoose = require('mongoose');

var voterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    voteDir: {
        type: Boolean,
        required: true
    },

    deleted: {
        type: Boolean,
        required: true
    }
});


var CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    votes: [ voterSchema ],

    date: {
        type: Date,
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
});

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

    votes: [ voterSchema ],

    date: {
        type: Date,
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
    
    comments: [ CommentSchema ]
});

module.exports = mongoose.model('Post', PostSchema);