
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

module.exports = mongoose.model('Comment', CommentSchema);