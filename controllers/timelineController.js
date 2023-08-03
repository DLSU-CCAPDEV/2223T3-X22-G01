const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {
    getTimeline: async function (req, res) {
        //default user: Eve
        var loggedProj = 'username banner displayName';
        var postProjection = 'votes username _id title date comments';
        var iconProjection = 'icon'

        var userLoggedIn = await db.findOne(User, {username: "oO0Eve0Oo"}, loggedProj);
        var loggedPostCt = await Post.countDocuments({username: userLoggedIn.username}).exec();

        var posts = await db.findMany(Post, {}, postProjection);
        for(var post of posts){
            var commentLength = post.comments.length;
        };
        
        var userIcon = await db.findMany(User, {username: posts.username}, iconProjection);

        if(posts != null || userLoggedIn != null) {
            var dateUnformat = new Date(posts.date);
            var dateProj = dateUnformat.toDateString();

            var details = {
                loggedUsername: userLoggedIn.username,
                displayName: userLoggedIn.displayName,
                numPosts: loggedPostCt,
                banner: userLoggedIn.banner,

                posts: posts,
                votes: posts.votes,
                postID: posts._id,
                title: posts.title,
                date: dateProj,
                numComment: commentLength,
                username: posts.username,
                icon: userIcon
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