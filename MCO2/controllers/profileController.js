/*

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

*/

const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    getProfile: async function (req, res) {

        // query where `idNum` is equal to URL parameter `idNum`
        // var u = req.params.username;
        var query = {username: req.params.username};

        // fields to be returned
        // posts
        var projection = 'username displayName bio icon banner';
        var postProjection = 'id title votes date comments';

        var result = await db.findOne(User, query, projection);
        var postResult = await db.findOne(Post, query, postProjection);
        
        if(result != null || postResult != null) { 
            
            // var commentCt = postResult.comments;
            var details = {
                
                username: result.username,
                displayName: result.displayName,
                bio: result.bio,
                icon: result.icon,
                banner: result.banner,
                postID: postResult._id,
                title: postResult.title,
                votes: postResult.votes,
                date: postResult.date,
                numComments: postResult.comments.length
            };

            res.render('profile-page', details);
        }

        else {
            res.render('error', {collectionType: "user"});
        }
        
    },

    getError: async function (req, res) {
        res.render('error', {collectionType: "user"});
    }
}

module.exports = profileController;