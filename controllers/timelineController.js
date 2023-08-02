const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const { validationResult } = require('express-validator');

const timelineController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: async function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        var projection = 'username displayName bio icon banner password';

        var query = {username: username, password: password};

        var response = await db.findOne(User, query, projection);

        var postArray = await db.collectionToArray("posts");
        var userArray = await db.collectionToArray("users");

        var queryLoggedIn = {username: "oO0Eve0Oo"};
        var postsByLoggedIn = await db.collectionToArray("posts", queryLoggedIn);
        var postCount = postsByLoggedIn.length;

        //projection
        var postProj = postArray.map(postArray => {
            var UserToMatch = postArray.username;
            var icon = userArray.find(({username}) => username == UserToMatch).icon;
            console.log(icon);
            
            var dateUnformat = new Date(postArray.date);
            var dateProj = dateUnformat.toDateString();
            return {
                postID: postArray._id,
                title: postArray.title,
                votes: postArray.votes,
                date: dateProj,
                numComments: postArray.comments.length,
                username: postArray.username,
                icon: icon,
                route: "/home"
            }
        });

        /*
            var postProj = postArray.map(postArray => {
                var UserToMatch = postArray.username;
                var icon = userArray.find(({username}) => username == UserToMatch).icon;

                var dateUnformat = new Date(postArray.date);
                var dateProj = dateUnformat.toDateString();
                
                return {
                    postID: postArray._id,
                    title: postArray.title,
                    votes: postArray.votes,
                    date: dateProj,
                    numComments: postArray.comments.length,
                    username: postArray.username,
                    icon: icon
                }
                
            });
        */
        
        if(response != null){
            var details = {
                //default user: oO0Eve0Oo
                username: "oO0Eve0Oo",
                banner: "banner_eve.jpg",
                displayName: "Eve",
                numPosts: postCount,

                posts: postProj,

                // icon: posterIcon.icon,
                
            };
            res.redirect('/home', details);
        }

        else{
            res.render('error');
        }
    },


    /*
        executed when the client sends an HTTP GET request `/signup`
        as defined in `../routes/routes.js`
    */
    getSignUp: function (req, res) {
        res.render('signup');
    },

    /*
        executed when the client sends an HTTP POST request `/signup`
        as defined in `../routes/routes.js`
    */
    postSignUp: async function(req,res){
        var errors = validationResult(req);

        if (!errors.isEmpty()) {

            errors = errors.errors;

            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].path + 'Error'] = errors[i].msg;

            res.render('signup', details);
        }

        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;

        var user = {
            displayName: name,
            username: username,
            bio: "Hi, ka-Adult!",
            icon: "pfp_" + name + ".jpg",
            banner: "banner_" + name + ".jpg",
            password: password
        }

        var response = await db.insertOne(User, user);

        if(response != null){
            res.redirect('/home');
        }
        else{
            res.render('error', {route: "/signup", collectionType: "page"});
        }
    },

    getCheckUsername: async function (req, res) {

        var username = req.query.username;

        var result = await db.findOne(User, {username: username}, 'username');
        res.send(result);
    },

    getTimeline: async function (req, res) {

        var projection = 'icon';
        var postProjection = 'id title votes date comments';

        
        var postArray = await db.collectionToArray("posts");
        var userArray = await db.collectionToArray("users");

        //projection
        var postProj = postArray.map(postArray => {
            var UserToMatch = postArray.username;
            var icon = userArray.find(({username}) => username == UserToMatch).icon;

            var dateUnformat = new Date(postArray.date);
            var dateProj = dateUnformat.toDateString();
            console.log(icon);
            return {
                postID: postArray._id,
                title: postArray.title,
                votes: postArray.votes,
                date: dateProj,
                numComments: postArray.comments.length,
                username: postArray.username,
                icon: icon
            }
            
        });

        if(userArray != null || postArray != null){
            var details = {
                posts: postProj,

                // icon: posterIcon.icon,
                route: userArray.username
            };

            res.render('index', details);
        }

        else{
            res.render('error', {collectionType: "page"});
        }

        // // switch (params.sortBy) {
        // //     case 'popular':
        // //         post2.sort((a, b) => {
        // //             return b.votes - a.votes;
        // //         });
        // //         break;
        // //     case 'recent':
        // //         post2.sort((a, b) => {
        // //             return new Date(b.date) - new Date(a.date);
        // //         });
        // //         break;
        // //     case 'unpopular':
        // //         post2.sort((a, b) => {
        // //             return a.votes - b.votes;
        // //         });
        // //         break;
        // //     case 'old':
        // //         post2.sort((a, b) => {
        // //             return new Date(a.date) - new Date(b.date);
        // //         });
        // //         break;
        // //     default:
        // //         post2.sort((a, b) => {
        // //             return a.id - b.id;
        // //         });
        // // }

    },

    // getSearch: async function(req,res){
    //     var query = req.query.filter;

    // },

    // voteUpdate: async function(req,res){

    // },

    newPost: async function(req, res){
        var title = req.body.postTitle;
        var postText = req.body.postBox;

        console.log('title: ' + title);
        console.log('postText: ' + postText);

        var post = {
            title: title,
            username: "oO0Eve0Oo",
            votes: "0",
            date: Date.now(),
            deleted: false,
            clickvote: false,
            dirvotes: false,
            description: postText,
            comments: [
                // username,
                // date,
                // votes,
                // clickvote,
                // dirvotes,
                // deleted,
                // description
            ]
        }

        var response = await db.insertOne(Post, post);

        if(response != null){
            res.redirect('/home');
        }
        else{
            res.render('error');
        }
    },

    getError: async function (req,res){
        res.render('error', {collectiontype: "user"});
    }
}

module.exports = timelineController;