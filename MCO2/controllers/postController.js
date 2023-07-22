const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const postController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getPostPage: async function (req, res) {
        var query = {_id: req.params.postID};
        var poster = {username: req.params.username};

        // fields to be returned
        var projection = 'postID title username votes date description comments';
        var userProjection = 'icon';

        var result = await db.findOne(Post, query, projection);
        var posterIcon = await db.findOne(User, poster, userProjection);
        
        var commenterUsername = result.comments.username;

        if(result != null || userResult != null) {
            var details = {
                votes: result.votes,
                title: result.title,
                description: result.description,
                username: result.username,
                date: result.date,
                commentVotes: result.comments.votes,
                commenterUsername: commenterUsername,
                commentDesc: result.comments.description,
                
                icon: posterIcon.icon,
                commenterIcon: await db.findOne(User, commenterUsername, userProjection)
            };

            res.render('post-page-u', details);
        };

        
    }
}

module.exports = postController;