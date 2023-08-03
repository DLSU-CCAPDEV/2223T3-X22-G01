const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    
    getProfile: async function (req ,res) {
        var query = {username: req.params.username};

        var profile = 'username displayName bio icon banner';
        var posts = '_id title votes date comments username';

        var user = await db.findOne(User, query, profile);

        var postRes = await db.findMany(Post, query, posts);
        console.log(user)

        for(var post of postRes){
            var commentLength = post.comments.length;
            // var posterIcon = 
        };

        if(user != null || postRes != null) {
            var dateProj = new Date(postRes.date).toDateString();
            // var dateProj = dateUnformat.toDateString();

            var details = {
                username: user.username,
                banner: user.banner,
                icon: user.icon,
                displayName: user.displayName,
                bio: user.bio,

                posts: postRes,
                icon: user.icon,
                votes: postRes.votes,
                postID: postRes._id,
                title: postRes.title,
                date: dateProj,
                numComments: commentLength,
                route: "/home" // if statement logged in (priority: sessions)
            }
            
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