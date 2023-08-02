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
    
    deleted: {
        type: Boolean,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Post', PostSchema);