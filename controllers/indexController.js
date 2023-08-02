const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');

const indexController = {

    getFavicon: function(req, res) {
        res.status(204);
    },

    getIndex: async function(req, res) {
        var postProjection = 'votes username _id title date comments';
        var iconProjection = 'icon'

        var posts = await db.findMany(Post, {}, postProjection);
        var userIcon = await db.findMany(User, {username: posts.username}, icon);

        if(posts != null) { 

            var dateUnformat = new Date(posts.date);
            var dateProj = dateUnformat.toDateString();
            
            var details = {
                posts: posts,
                votes: posts.votes,
                title: posts.title,
                username: posts.username,
                date: dateProj,
                numComments: posts.comments.length,
                icon: userIcon
            }

            res.render('index', details);
        } else {
            res.render('error', {collectionType: "page", route: "/"});
        }
    }

}

module.exports = indexController;