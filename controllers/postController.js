const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    // TODO: comments
    getPost: async function(req, res) {
        var postID = {_id: req.params.postID};
        var poster = {username: req.params.username};

        var projection = 'postID title username votes date description comments';
        var userProjection = 'username icon';

        var result = await db.findOne(Post, postID, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);
        var userIcon = await db.findMany(User, {}, userProjection);
        //replace this with token stuff i guess
        var loggedIn = true;
      
        if(result != null || posterIcon != null) {
            var dateUnformat = new Date(result.date);
            var dateProj = dateUnformat.toDateString();
            
            var commentCount = 0;
            var commentObject = result.comments.map((c) => {
                commentCount++;
                var commenterIcon = userIcon.find((user) => user.username == c.username);
                return {
                    commentID: commentCount,
                    commenterUsername: c.username,
                    commentVotes: c.votes,
                    commentDate: new Date(c.date).toDateString(),
                    commentDesc: c.description,
                    commenterIcon: commenterIcon.icon,
                    commentIsNotDeleted: !c.deleted
                }

            });

            var details = {
                username: result.username,
                votes: result.votes,
                title: result.title,
                description: result.description,
                date: dateProj,
                comments: commentObject,
                icon: posterIcon.icon,
                route: "/", // change for conditions
                loggedIn: loggedIn
            };
            // console.log('comments projection: ' + details.comments);
            // console.log('commenterUsername projection: ' + details.commenterUsername);
            // console.log('commentVotes projection: ' + details.commentVotes);
            // console.log('commentDesc projection: ' + details.commentDesc);
            
            if(loggedIn){
                details.loggedUsername= "oO0Eve0Oo";
                details.displayName= "Eve";
                details.numPosts= "1";
                details.route = "/home";
            } 

            res.render('post-page', details);
        } else {
            var error = {
                collectionType: "post",
                route: '/home'
            }
            res.render('error', error);
        }

        
    },

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
        

    }


}

module.exports = postController;