const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    
    getProfile: async function (req ,res) {
        var query = {username: req.params.username};

        var profile = 'username displayName bio icon banner';
        var posts = '_id title votes date comments username';

        var userPromise = db.findOne(User, query, profile);
        var postPromise = db.findMany(Post, query, posts);

        var promise = Promise.all([userPromise, postPromise]);

        promise.then((results) => {
            var user = results[0];
            var post = results[1];

            if(user != null && post != null) {
                
                var postObject = post.map((eachPost) => {
                    return {
                        commentLength: eachPost.comments.length,
                        votes: eachPost.votes,
                        postID: eachPost._id,
                        username: eachPost.username,
                        title: eachPost.title,
                        date: new Date(eachPost.date).toDateString(),
                        icon: user.icon
                    }

                });

                var details = {
                    username: user.username,
                    displayName: user.displayName,
                    bio: user.bio,
                    icon: user.icon,
                    banner: user.banner,
                    route: "/home",

                    posts: postObject

                }
                //console.log(`user: `+user);
                //console.log(`post: `+post);
                res.render('profile-page', details);
            } else {
                var error = {
                    collectionType: "user",
                    route: "/home"
                }
                res.render('error', error);
            }

            //console.log(`username from User: `+user.username)

            
        });

        //               THIS WORKS ON ITS OWN
        // var userDetails = await db.findOne(User, query, profile).then((user) => {
        //     if(user != null) {
                

        //         var details = {
        //             username: user.username,
        //             displayName: user.displayName,
        //             bio: user.bio,
        //             icon: user.icon,
        //             banner: user.banner
        //         }
        //         res.render('profile-page', details);
        //         // return details;
        //     } else {
        //         // return null;
        //         var error = {
        //             collectionType: "user",
        //             route: "/home"
        //         }
        //         res.render('error', error);
        //     }
            
        // });

        // var postDetails = await db.findMany(Post, query, posts).then((post) => {
        //     for(var postCt of post) {
        //         var commentLength = postCt.comments.length;
        //     }
        //     if(post != null) {
        //         var details = {
        //             votes: post.votes,
        //             postID: post._id,
        //             username: post.username,
        //             title: post.title,
        //             date: new Date(post.date).toDateString(),
        //             numComments: commentLength
        //         }
        //         res.render('profile-page', details);
        //     } else {
        //         // return null;
        //         var error = {
        //             collectionType: "user",
        //             route: "/home"
        //         }
        //         res.render('error', error);
        //     }
        // });

        // console.log(`user details: ` + userDetails)
        // console.log(`post details: ` + postDetails)

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
