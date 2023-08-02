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
        var loggedPostCt = db.countDocuments(Post, {username: userLoggedIn.username});

        var posts = await db.findMany(Post, {}, postProjection);
        var commentLength = await Post.find().populate({ path: 'comment_length', count: true }).exec();
        var userIcon = await db.findMany(User, {username: posts.username}, iconProjection);

        if(posts != null || userLoggedIn != null) {
            var dateUnformat = new Date(posts.date);
            var dateProj = dateUnformat.toDateString();

            var details = {
                loggedUsername: userLoggedIn.username,
                displayName: userLoggedIn.displayName,
                numPosts: loggedPostCt,
                banner: userLoggedIn.banner,

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