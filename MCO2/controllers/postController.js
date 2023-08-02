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
                
                // commenterIcon: commenterIcon.icon,

                icon: posterIcon.icon,
                route: result.username
                
            };
            // console.log('comments projection: ' + details.comments);
            // console.log('commenterUsername projection: ' + details.commenterUsername);
            // console.log('commentVotes projection: ' + details.commentVotes);
            // console.log('commentDesc projection: ' + details.commentDesc);
            

            res.render('post-page-u', details);
        };

        
    },

    insertComment: async function (req, res) {
        var commentProjection = 'username date votes clickvote deleted description';
        // var commentQuery = await ;
    }
}

module.exports = postController;