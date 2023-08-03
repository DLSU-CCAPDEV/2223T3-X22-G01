const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {
    getTimeline: async function (req, res) {
        //default user: Eve
        var loggedProj = 'username banner displayName';
        var postProjection = 'votes username _id title date comments';
        var iconProjection = 'username icon'

        var userLoggedIn = await db.findOne(User, {username: "oO0Eve0Oo"}, loggedProj);
        var loggedPostCt = await Post.countDocuments({username: userLoggedIn.username}).exec();

        var posts = await db.findMany(Post, {}, postProjection);
        var userIcon = await db.findMany(User, {}, iconProjection);

        var postObject = posts.map((eachPost) => {
            var postIcon = userIcon.find((user) => user.username == eachPost.username);
            
            return {
                commentLength: eachPost.comments.length,
                votes: eachPost.votes,
                postID: eachPost._id,
                username: eachPost.username,
                title: eachPost.title,
                date: new Date(eachPost.date).toDateString(),
                icon: postIcon.icon
            }
        });
        
        

        if(posts != null || userLoggedIn != null) {

            var details = {
                loggedUsername: userLoggedIn.username,
                displayName: userLoggedIn.displayName,
                numPosts: loggedPostCt,
                banner: userLoggedIn.banner,

                posts: postObject
            }

            res.render('timeline', details);
        } else {
            var error = {
                collectionType: "page",
                route: "/"
            }
            res.render('error', error);
        }

    }
}

module.exports = timelineController;