const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const commentController = {

    insertComment: async function (req, res) {
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);
        
        var commentText = req.body.commentDesc.trim();

        console.log('comment: ' + commentText);

        var isEmpty = commentText.replace(/\s+/g, '') == '';

        if (!isEmpty){
            var comment = {
                username: req.body.commenterUsername,
                date: req.body.commentDate,
                votes: 0,
                clickvote: false,
                dirvotes: false,
                deleted: false,
                description: commentText
            }

            post.comments.push(comment);
            
            var result = await db.updateOne(Post, query, post);
        } else {
            console.log('your comment is empty');
        }

    },

    deleteComment: async function (req, res) {
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);
        console.log("comment by "+ post.comments[req.body.commentID-1].username + " was soft deleted.");
        
        post.comments[req.body.commentID-1].deleted = true;

        var result = await db.updateOne(Post, query, post);
    },

    //edit comment

    //bonus: markdown

    editComment: async function (req,res) {
    }
}

module.exports = commentController;