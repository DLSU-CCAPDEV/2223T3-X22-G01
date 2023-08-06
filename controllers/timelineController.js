const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {
    getTimeline: async function (req, res) {
        //default user: oO0Eve0Oo
        var loggedIn = req.session.username != null;

        var loggedProj = 'username icon banner displayName';
        var postProjection = 'votes username _id title date comments deleted';
        var iconProjection = 'username icon'

        if (loggedIn) {
            var userLoggedIn = await db.findOne(User, {username: req.session.username}, loggedProj);
            var loggedPostCt = await Post.countDocuments({username: userLoggedIn.username}).exec();
            if (!userLoggedIn) loggedIn = false;
        }
        

        var posts = await db.findMany(Post, {}, postProjection);
        var userIcon = await db.findMany(User, {}, iconProjection);

        var postObject = posts.map((eachPost) => {
            var postIcon = userIcon.find((user) => user.username == eachPost.username);
            
            var voteCount = 0;
            var userUpvote = false;
            var userDownvote = false;

            eachPost.votes.forEach((element) => {
                if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                if(loggedIn){
                    if (element.username == userLoggedIn.username) {
                        userUpvote = element.voteDir && !element.deleted;
                        userDownvote = !element.voteDir && !element.deleted;
                    }
                }
            });

            return {
                numComments: eachPost.comments.length,
                votes: voteCount,
                postID: eachPost._id,
                username: eachPost.username,
                userUpvote: userUpvote,
                userDownvote: userDownvote,
                
                title: eachPost.title,
                date: new Date(eachPost.date).toDateString(),
                icon: postIcon.icon,
                notDeleted: !eachPost.deleted,
                loggedIn: loggedIn
            }
        });
        
        var details = {
            loggedIn: false,
            posts: postObject
        };

        if(loggedIn) {

            details = {
                loggedIn: true,
                loggedUsername: userLoggedIn.username,
                displayName: userLoggedIn.displayName,
                profileIcon: userLoggedIn.icon,
                numPosts: loggedPostCt,
                banner: userLoggedIn.banner,
                posts: postObject
            }
        }  

        res.render('timeline', details);

    }
}

module.exports = timelineController;