const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    getPost: async function(req, res) {
        var postID = {_id: req.params.postID};
        var poster = {username: req.params.username};

        var projection = 'postID title username votes date description comments deleted';
        var userProjection = 'username icon';

        var result = await db.findOne(Post, postID, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);
        var userIcon = await db.findMany(User, {}, userProjection);
        //replace this with token stuff i guess
        var loggedIn = true;
      
        if(result != null && posterIcon != null && !result.deleted) {
            var dateUnformat = new Date(result.date);
            var dateProj = dateUnformat.toDateString();
            
            var commentObject = result.comments.map((c) => {
                var commenterIcon = userIcon.find((user) => user.username == c.username);

                var voteCount = 0;
                var userUpvote = false;
                var userDownvote = false;

                c.votes.forEach((element) => {
                    
                    if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                    if (element.username == "oO0Eve0Oo") {
                        userUpvote = element.voteDir && !element.deleted;
                        userDownvote = !element.voteDir && !element.deleted;
                    }
                });

                return {
                    commentID: c._id,
                    commenterUsername: c.username,
                    commentVotes: voteCount,
                    commentUpvoted: userUpvote,
                    commentDownvoted: userDownvote,
                    commentDate: new Date(c.date).toDateString(),
                    commentDesc: c.description,
                    commenterIcon: commenterIcon.icon,
                    commentIsNotDeleted: !c.deleted
                }

            });

            var voteCount = 0;
            var userUpvote = false;
            var userDownvote = false;

            result.votes.forEach((element) => {
                
                if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                if (element.username == "oO0Eve0Oo") {
                    userUpvote = element.voteDir && !element.deleted;
                    userDownvote = !element.voteDir && !element.deleted;
                }
            });

            var details = {
                username: result.username,
                votes: voteCount,
                userUpvote: userUpvote,
                userDownvote: userDownvote,

                title: result.title,
                description: result.description,
                date: dateProj,
                comments: commentObject,
                icon: posterIcon.icon,
                route: "/", // change for conditions
                loggedIn: loggedIn
            };
            
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

    //TODO:
    //add post
    //delete post
    //edit post

    //bonus: markdown

    insertPost: async function(req, res) {
        var title = req.body.title.trim();
        var description = req.body.description.trim();
        
        var emptyTitle = title == '';
        var emptyDescription = description == '';

        if (!emptyTitle && !emptyDescription){
            var post = {
                title: title,
                username: req.body.username,
                votes: 0,
                date: req.body.date,
                deleted: false,
                description: description
            }

            var result = await db.insertOne(Post, post);
            console.log("A new post titled, "+title+", was created.");
        } else {
            console.log("incomplete post data.");
        }
        
        
    },
    deletePost: async function(req, res) {
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);

        post.deleted = true;
        
        var result = await db.updateOne(Post, query, post);
        console.log("post, "+ req.body.postID+" has been soft deleted.");
    },

    editPost: async function(req, res) {
        
    },

    upvotePost: async function(req, res) {
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);

        var user = "oO0Eve0Oo";

        var voterIndex = post.votes.findIndex(e => e.username == user);
        if (voterIndex > -1){
            userVote = post.votes[voterIndex];

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

            post.votes.push(newVote);

            console.log("upvote by " + user + "has been added");
        }
        
        var result = await db.updateOne(Post, query, post);
    },

    downvotePost: async function(req, res) {
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);

        var user = "oO0Eve0Oo";

        var voterIndex = post.votes.findIndex(e => e.username == user);
        if (voterIndex > -1){
            userVote = post.votes[voterIndex];

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

            post.votes.push(newVote);

            console.log("upvote by " + user + "has been added");
        }
        
        var result = await db.updateOne(Post, query, post);
    } 
}

module.exports = postController;