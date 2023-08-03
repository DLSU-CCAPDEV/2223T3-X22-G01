const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const indexController = {

    getFavicon: function(req, res) {
        res.status(204);
    },

    getIndex: async function(req, res) {
        var postProjection = 'votes username _id title date comments';
        var iconProjection = 'username icon'

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

        

        if(posts != null) { 
            var details = {
                posts: postObject,
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