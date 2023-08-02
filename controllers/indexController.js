const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const indexController = {

    getFavicon: function(req, res) {
        res.status(204);
    },

    getIndex: async function(req, res) {
        var postProjection = 'votes username _id title date comments';
        var iconProjection = 'icon'

        var posts = await db.findMany(Post, {}, postProjection);
        var commentLength = await Post.find().populate({ path: 'comment_length', count: true }).exec();
        var userIcon = await db.findMany(User, {username: posts.username}, iconProjection);

        if(posts != null) { 

            var dateUnformat = new Date(posts.date);
            var dateProj = dateUnformat.toDateString();
            
            var details = {
                posts: posts,
                votes: posts.votes,
                title: posts.title,
                username: posts.username,
                date: dateProj,
                numComments: commentLength,
                icon: userIcon
            }

            res.render('index', details);
        } else {
            var error = {
                collectionType: "page",
                route: "/"
            }
            res.render('error', error);
        }
    }

}

module.exports = indexController;