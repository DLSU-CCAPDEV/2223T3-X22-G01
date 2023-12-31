const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const profileController = {
    
    getProfile: async function (req ,res) {
        var query = {username: req.params.username};
        var loggedIn = req.session.username != null;
        var loggedProj = 'username icon banner displayName';

        if (loggedIn) {
            var userLoggedIn = await db.findOne(User, {username: req.session.username}, loggedProj);
            if (!userLoggedIn) loggedIn = false;
        }

        var profile = 'username displayName bio icon banner';
        var posts = '_id title votes date comments username deleted';

        var userPromise = db.findOne(User, query, profile);
        var postPromise = db.findMany(Post, query, posts);

        var promise = Promise.all([userPromise, postPromise]);

        promise.then((results) => {
            var user = results[0];
            var post = results[1];

            if(user != null && post != null) {
                
                var postObject = post.map((eachPost) => {
                    var voteCount = 0;
                    var userUpvote = false;
                    var userDownvote = false;

                    eachPost.votes.forEach((element) => {
                        if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                        if(loggedIn){
                            if (element.username == userLoggedIn.username) {
                                userUpvote = element.voteDir && !element.deleted;
                                userDownvote = !element.voteDir && !element.deleted;
                            }
                        }
                    });

                    return {
                        numComments: eachPost.comments.length,
                        votes: voteCount,
                        postID: eachPost._id,
                        username: eachPost.username,
                        userUpvote: userUpvote,
                        userDownvote: userDownvote,
                        
                        title: eachPost.title,
                        date: new Date(eachPost.date).toDateString(),
                        icon: user.icon,
                        notDeleted: !eachPost.deleted,
                        loggedIn: loggedIn
                    }
                });

                var details = {
                    username: user.username,
                    displayName: user.displayName,
                    bio: user.bio,
                    icon: user.icon,
                    banner: user.banner,
                    loggedIn: loggedIn,
                    isAuthor: req.session.username == user.username,
                    posts: postObject,
                    route: '/',
                    loggedUsername:req.session.username
                }

                if (loggedIn){
                    details.profileIcon = userLoggedIn.icon;
                }

                //console.log(`user: `+user);
                //console.log(`post: `+post);
                res.render('profile-page', details);
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

    },
    editProfile: async function(req, res) {
        if(req.session.username){
            var profile = 'username displayName bio icon banner';
            var query = {username: req.body.username};
            var user = await db.findOne(User, query, profile);

            if (user.username == req.session.username) {
                user.bio = req.body.bio;
                user.displayName = req.body.displayName;

                var result = await db.updateOne(User, query, user);

                console.log("user, "+ req.body.username+" has been edited.");
            } else {
                console.log('you are not logged in as this user');
            }
            
        } else {
            console.log('user is not logged in');
        } 
    }

}

module.exports = profileController;
