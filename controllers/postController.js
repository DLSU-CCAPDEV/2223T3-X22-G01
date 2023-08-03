const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    // TODO: comments
    getPost: async function(req, res) {
        var postID = {_id: req.params.postID};
        var poster = {username: req.params.username};

        var projection = 'postID title username votes date description comments';
        var userProjection = 'icon';
        var commentProjection = 'username votes description date';

        var result = await db.findOne(Post, postID, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);

        
        if(result != null || posterIcon != null) {
            var dateUnformat = new Date(result.date);
            var dateProj = dateUnformat.toDateString();


            var details = {
                username: result.username,
                route: "/home", // change for conditions
                votes: result.votes,
                title: result.title,
                description: result.description,
                date: dateProj,
                icon: posterIcon,

                comments: result.comments
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

    newPost: async function(req, res) {
        
    }

}

module.exports = postController;