// import module `mongoose`
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
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

    votes: {
        type: Number,
        required: true
    },

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

PostSchema.virtual('comment_length', {
    ref: 'Comment',
    localField: 'comments',
    foreignField: '_id',
    count: true
});

PostSchema.set('toObject', {virtuals: true});
PostSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', PostSchema);