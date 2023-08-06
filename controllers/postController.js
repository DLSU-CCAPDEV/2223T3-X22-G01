const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    getPost: async function(req, res) {
        var loggedIn = req.session.username != null;

        var postID = {_id: req.params.postID};
        var poster = {username: req.params.username};

        var projection = 'postID title username votes date description comments deleted';
        var userProjection = 'username icon';
        var loggedProj = 'username icon banner displayName';

        var result = await db.findOne(Post, postID, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);
        var userIcon = await db.findMany(User, {}, userProjection);
      
        
        if (loggedIn) {
            var userLoggedIn = await db.findOne(User, {username: req.session.username}, loggedProj);
            var loggedPostCt = await Post.countDocuments({username: userLoggedIn.username}).exec();
            if (!userLoggedIn) loggedIn = false;
        }
      
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
                    if(loggedIn){
                    if (element.username == userLoggedIn.username) {
                        userUpvote = element.voteDir && !element.deleted;
                        userDownvote = !element.voteDir && !element.deleted;
                    }}
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
                    commentIsNotDeleted: !c.deleted,
                    loggedIn: loggedIn,
                    commentAuthor:req.session.username == c.username
                }

            });

            var voteCount = 0;
            var userUpvote = false;
            var userDownvote = false;

            result.votes.forEach((element) => {
                
                if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                if(loggedIn){
                    if (element.username == userLoggedIn.username) {
                        userUpvote = element.voteDir && !element.deleted;
                        userDownvote = !element.voteDir && !element.deleted;
                    }
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
                route: "/", 
                loggedIn: false
            };

            if(loggedIn){
                var details = {

                    loggedIn: true,
                    loggedUsername: userLoggedIn.username,
                    displayName: userLoggedIn.displayName,
                    numPosts: loggedPostCt,
                    banner: userLoggedIn.banner,
                    profileIcon: userLoggedIn.icon,
                    postAuthor: userLoggedIn.username == result.username,

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
                    loggedIn: true
                };
            } 

            res.render('post-page', details);
        } else {
            var error = {
                collectionType: "post",
                route: '/'
            }
            res.render('error', error);
        }
    },

    insertPost: async function(req, res) {

        if(req.session.username){
            var title = req.body.title.trim();
            var description = req.body.description.trim();
            
            var emptyTitle = title == '';
            var emptyDescription = description == '';

            if (!emptyTitle && !emptyDescription){
                var post = {
                    title: title,
                    username: req.session.username,
                    votes: [],
                    date: req.body.date,
                    deleted: false,
                    description: description
                }

                var result = await db.insertOne(Post, post);
                console.log("A new post titled, "+title+", was created.");
            } else {
                console.log("incomplete post data.");
            }
        } else {
            console.log('user is not logged in');
        }
        
        
        
    },
    deletePost: async function(req, res) {
        if(req.session.username){
            var postProjection = 'postID title username votes date description comments';
            var query = {_id: req.body.postID};
            var post = await db.findOne(Post, query, postProjection);

            if (post.username == req.session.username) {
                post.deleted = true;
                var result = await db.updateOne(Post, query, post);
                console.log("post, "+ req.body.postID+" has been soft deleted.");
            } else {
                console.log('you are not the maker of this post');
            }
            
        } else {
            console.log('user is not logged in');
        } 
    },

    editPost: async function(req, res) {
        
    },

    upvotePost: async function(req, res) {
        if(req.session.username){
            var postProjection = 'postID title username votes date description comments';
            var query = {_id: req.body.postID};
            var post = await db.findOne(Post, query, postProjection);

            var user = req.session.username;

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
        } else {
            console.log('user is not logged in');
        }
    },

    downvotePost: async function(req, res) {
        if(req.session.username){
        
        var postProjection = 'postID title username votes date description comments';
        var query = {_id: req.body.postID};
        var post = await db.findOne(Post, query, postProjection);

        var user = req.session.username;

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

    } else {
        console.log('user is not logged in');
    }
    } 
}

module.exports = postController;