const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    
    getProfile: async function (req ,res) {
        var query = {username: req.params.username};

        var profile = 'username displayName bio icon banner';
        var posts = '_id title votes date comments username';

        var userDetails = await db.findOne(User, query, profile).then((user) => {
            if(user != null) {
                var details = {
                    username: user.username,
                    displayName: user.displayName,
                    bio: user.bio,
                    icon: user.icon,
                    banner: user.banner
                }
                res.render('profile-page', details);
                // return details;
            } else {
                // return null;
                var error = {
                    collectionType: "user",
                    route: "/home"
                }
                res.render('error', error);
            }
            
        });

        var postDetails = await db.findMany(Post, query, posts).then((post) => {
            for(var postCt of post) {
                var commentLength = postCt.comments.length;
            }
            if(post != null) {
                var details = {
                    votes: post.votes,
                    postID: post._id,
                    username: post.username,
                    title: post.title,
                    date: new Date(post.date).toDateString(),
                    numComments: commentLength
                }
                res.render('profile-page', details);
            } else {
                // return null;
                var error = {
                    collectionType: "user",
                    route: "/home"
                }
                res.render('error', error);
            }
        });

        console.log(`user details: ` + userDetails)
        console.log(`post details: ` + postDetails)

        // if(userDetails != null || postDetails != null) {
        //     res.render('profile-page', {userDetails, postDetails});
        // } else {
        //     var error = {
        //         collectionType: "user",
        //         route: "/home"
        //     }
        //     res.render('error', error);
        // }



        // var userPromise = await db.findOne(User, query, profile);
        // console.log(`userPromise: `+ userPromise)
        // var postPromise = await db.findMany(Post, query, posts);
        // console.log(`postPromise: `+ postPromise)

        // for(var post of postPromise){
        //     var commentLength = post.comments.length;
        //     console.log(`commentLength: ` + commentLength)
        // }

        // if(userPromise != null || postPromise != null) {
        //     var details = {
        //         username: userPromise.username,
        //         displayName: userPromise.displayName,
        //         banner: userPromise.banner,
        //         icon: userPromise.icon,
        //         bio: userPromise.bio,

        //         posts: postPromise,
        //         votes: postPromise.votes,
        //         postID: postPromise._id,
        //         title: postPromise.title,
        //         date: new Date(postPromise.date).toDateString(),
        //         numComments: commentLength
        //     };

        //     res.render('profile-page', details);

        // } else {
        //     var error = {
        //         collectionType: "user",
        //         route: "/home"
        //     }
        //     res.render('error', error);
        // }

    }

}

module.exports = profileController;