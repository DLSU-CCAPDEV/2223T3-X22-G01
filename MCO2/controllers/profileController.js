

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
        // var postResult = await db.findMany(Post, query, postProjection);

        // var postResult = Post.map(posts => {
        //     return {

        //     }
        // });

        // console.log(postResult);

        // var postCollection = db.collection("posts");
        // var postArray = Array.from(postCollection);

        var postArray = await db.collectionToArray("posts", query);
        console.log(query);
        console.log(postArray);

        var postProj = postArray.map(postArray => {
            return {
                postID: postArray._id,
                title: postArray.title,
                votes: postArray.votes,
                date: postArray.date,
                numComments: postArray.comments.length,
                username: postArray.username,
                icon: result.icon
            }
        });

        console.log(postArray.username);
        
        if(result != null) { 
            
            // var commentCt = postResult.comments;
            var details = {
                
                username: result.username,
                displayName: result.displayName,
                bio: result.bio,
                icon: result.icon,
                banner: result.banner,
                posts: postProj
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