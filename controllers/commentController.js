const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const commentController = {

    insertComment: async function (req, res) {
        if(req.session.username){
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);
        
        var commentText = req.body.commentDesc.trim();

        console.log('comment: ' + commentText);

        var isEmpty = commentText.replace(/\s+/g, '') == '';

        if (!isEmpty){
            var comment = {
                username: req.session.username,
                date: req.body.commentDate,
                votes: [],
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
        } else console.log("you are not logged in.");

    },

    deleteComment: async function (req, res) {
        if(req.session.username){
            var postProjection = 'postID title username votes date description comments';
            var query = {_id: req.body.postID};
            var post = await db.findOne(Post, query, postProjection);
            
            var comment = post.comments.find(e => e._id == req.body.commentID);
            
            if (comment.username == req.session.username){
                console.log("comment by "+ comment.username + " was soft deleted.");
                comment.deleted = true;
                var result = await db.updateOne(Post, query, post);
            }   else console.log("you are not the post author.");
            
        } else console.log("you are not logged in.");
    },

    //edit comment

    //bonus: markdown

    editComment: async function (req,res) {
    },

    upvoteComment: async function(req, res) {
        if(req.session.username){
            var postProjection = 'postID title username votes date description comments';
            var query = {_id: req.body.postID};
            var post = await db.findOne(Post, query, postProjection);

            var comment = post.comments.find(e => e._id == req.body.commentID).votes;
            
            var user = req.session.username;

            var voterIndex = comment.findIndex(e => e.username == user);
            if (voterIndex > -1){
                userVote = comment[voterIndex];

                if (userVote.voteDir && !userVote.deleted){
                    userVote.deleted = true;
                    console.log("upvote by " + user + "was removed");
                } else {
                    userVote.voteDir = true;
                    userVote.deleted = false;
                    console.log("vote by " + user + "was changed to upvote");
                }
                
            }else{
                newVote = {
                    username: user,
                    voteDir: true,
                    deleted: false
                }

                comment.push(newVote);

                console.log("upvote by " + user + "has been added");
            }

            var result = await db.updateOne(Post, query, post);
        } else console.log("you are not logged in.");
    },

    downvoteComment: async function(req, res) {
        if(req.session.username){
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);

        var comment = post.comments.find(e => e._id == req.body.commentID).votes;
        
        var user = req.session.username;

        var voterIndex = comment.findIndex(e => e.username == user);
        if (voterIndex > -1){
            userVote = comment[voterIndex];

            if (!userVote.voteDir && !userVote.deleted){
                userVote.deleted = true;
                console.log("downvote by " + user + "was removed");
            } else {
                userVote.voteDir = false;
                userVote.deleted = false;
                console.log("vote by " + user + "was changed to downvote");
            }
            
        }else{
            newVote = {
                username: user,
                voteDir: false,
                deleted: false
            }

            comment.push(newVote);

            console.log("downvote by " + user + "has been added");
        }

        var result = await db.updateOne(Post, query, post);
        } else console.log("you are not logged in.");
    }
}

module.exports = commentController;