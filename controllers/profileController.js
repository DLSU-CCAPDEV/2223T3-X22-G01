

const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const moment = require(`moment`);

const profileController = {
    getProfile: async function (req, res) {

    
        var query = {username: req.params.username};

        // fields to be returned
        var projection = 'username displayName bio icon banner';
        var postProjection = 'id title votes date comments';

        var result = await db.findOne(User, query, projection);

        var postArray = await db.collectionToArray("posts", query);
        console.log(query);
        console.log(postArray);

        var postProj = postArray.map(postArray => {
            var dateUnformat = new Date(postArray.date);
            var dateProj = dateUnformat.toDateString();
            return {
                postID: postArray._id,
                title: postArray.title,
                votes: postArray.votes,
                date: dateProj,
                numComments: postArray.comments.length,
                username: postArray.username,
                icon: result.icon
            }
        });

        console.log(postArray.username);
        
        if(result != null) { 
            
            var details = {
                
                username: result.username,
                displayName: result.displayName,
                bio: result.bio,
                icon: result.icon,
                banner: result.banner,
                posts: postProj,
                route: "home"
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