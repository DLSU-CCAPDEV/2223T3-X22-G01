const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getPostPage: async function (req, res) {
        var query = {_id: req.params.postID};
        var poster = {username: req.params.username};

        // fields to be returned
        var projection = 'postID title username votes date description comments';
        var userProjection = 'icon';

        var result = await db.findOne(Post, query, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);

        var userArray = await db.collectionToArray("users");

        var comments = result.comments;
        console.log(comments);

        // var commentRes = await db.findOne(Post, comments, commentProjection);
        
        // var commentRes = comments.map(comments => comments);
        // console.log(commentRes);
        
        // var postDate = new Date(result.date).toLocaleString;
        // var commenterUsername = comments.username;
        // console.log(commentRes);

        //${new Date(p.date).toLocaleString()}
        
        // var commenterIcon = await db.findOne(User, commenterUsername, userProjection);

        //projection
        var commentProj = comments.map(comments => {
            var UserToMatch = comments.username;
            var icon = userArray.find(({username}) => username == UserToMatch).icon;
            
            var dateUnformat = new Date(comments.date);
            var dateProj = dateUnformat.toDateString();
            return {
                commenterUsername: comments.username,
                commentVotes: comments.votes,
                commentDesc: comments.description,
                commentDate: dateProj,
                commenterIcon: icon
            }    
        });

        //replace this with token stuff i guess
        var loggedIn = true;

        if(result != null) {
            var postDateUnformat = new Date(result.date);
            var postDateProj = postDateUnformat.toDateString();
            var details = {
                votes: result.votes,
                title: result.title,
                description: result.description,
                username: result.username,
                date: postDateProj,

                comments: commentProj,

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
        };

        
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