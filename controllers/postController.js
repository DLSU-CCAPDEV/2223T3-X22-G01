const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    // TODO: comments
    getPost: async function(req, res) {
        var postID = {_id: req.params.postID};
        var poster = {username: req.params.username};

        var projection = 'postID title username votes date description comments';
        var userProjection = 'icon';
        var commentProjection = 'username votes description date';

        var result = await db.findOne(Post, postID, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);

        //replace this with token stuff i guess
        var loggedIn = true;
      
        if(result != null || posterIcon != null) {
            var dateUnformat = new Date(result.date);
            var dateProj = dateUnformat.toDateString();

            var details = {
                username: result.username,
                route: "/home", // change for conditions
                votes: result.votes,
                title: result.title,
                description: result.description,
                username: result.username,
                date: dateProj,
                icon: posterIcon,
                comments: result.comments,
                icon: posterIcon.icon,
                route: "",
                loggedIn: loggedIn
            };
            // console.log('comments projection: ' + details.comments);
            // console.log('commenterUsername projection: ' + details.commenterUsername);
            // console.log('commentVotes projection: ' + details.commentVotes);
            // console.log('commentDesc projection: ' + details.commentDesc);
            
            if(loggedIn){
                details.c_username= "oO0Eve0Oo";
                details.c_displayName= "Eve";
                details.c_numUserPosts= "1";
                details.c_numUserComments = "0";
                details.route = "home";
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
        var query = {_id: req.params.postID};
        var projection = 'postID title username votes date description comments';
        var result = await db.findOne(Post, query, projection);

        var commentText = req.body.commentBox;

        console.log('comment: ' + commentText);

        var isEmpty = commentText.replace(/\s+/g, '') == '';

        if (!isEmpty){
            var comment = {
                username: "oO0Eve0Oo",
                date: Date.now(),
                votes: 0,
                clickvote: false,
                dirvotes: false,
                deleted: false,
                description: commentText
            }

            result.comments.push(comment);
            
            var response = await db.updateOne(Post, query, result)
        } else {
            console.log('your comment is empty');
        }

    }

}

module.exports = postController;