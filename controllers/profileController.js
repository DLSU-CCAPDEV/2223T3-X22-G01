const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    
    getProfile: async function (req ,res) {
        var query = {username: req.params.username};

        var profile = 'username displayName bio icon banner';
        var posts = '_id title votes date comments username';

        var userPromise = await db.findOne(User, query, profile);
        console.log(`userPromise: `+ userPromise)
        var postPromise = await db.findMany(Post, query, posts);
        console.log(`postPromise: `+ postPromise)

        for(var post of postPromise){
            var commentLength = post.comments.length;
            console.log(`commentLength: ` + commentLength)
        }

        if(userPromise != null || postPromise != null) {
            var details = {
                username: userPromise.username,
                displayName: userPromise.displayName,
                banner: userPromise.banner,
                icon: userPromise.icon,
                bio: userPromise.bio,

                posts: postPromise,
                votes: postPromise.votes,
                postID: postPromise._id,
                title: postPromise.title,
                date: new Date(postPromise.date).toDateString(),
                numComments: commentLength
            };

            res.render('profile-page', details);

        } else {
            var error = {
                collectionType: "user",
                route: "/home"
            }
            res.render('error', error);
        }

    }

}

module.exports = profileController;