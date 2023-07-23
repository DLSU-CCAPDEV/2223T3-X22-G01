const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

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

        var user = {
            username: username,
            password: password
        }

        var response = await db.insertOne(User, user);

        if(response != null){
            res.redirect('/success?username=' + username);
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
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;

        var user = {
            name: name,
            username: username,
            password: password
        }

        var response = await db.insertOne(User, user);

        if(response != null){
            res.redirect('/success?name=' + name +'&username=' + username);
        }
        else{
            res.render('error');
        }
    },

    getCheckUsername: async function (req, res) {

        var username = req.query.username;

        var result = await db.findOne(User, {username: username}, 'username');
        res.send(result);
    },

    getTimeline: async function (req, res) {
        // var query = db.getCollectionInfos();

        var projection = 'id title username votes date comments';
        var postProjection = 'id title votes date comments';

        // var result = await db.findMany(User, query, projection);
        // var postResult = await db.findMany(Post, query, postProjection);
        var result = await User.find();
        var postResult = await Post.find();
        var postArray = await db.collectionToArray("posts");

        var posts = result.posts;
        console.log(posts);

        //projection
        var postProj = postArray.map(postArray => {
            return {
                postID: postArray._id,
                title: postArray.title,
                votes: postArray.votes,
                date: postArray.date,
                numComments: postArray.comments.length,
                username: postArray.username,
                // icon: result.icon
            }
        });

        if(result != null || postResult != null){
            var details = {
                username: result.username,
                displayName: result.displayName,
                bio: result.bio,
                icon: result.icon,
                banner: result.banner,
                //numComments: postResult.comments.length

                posts: postProj,

                // icon: posterIcon.icon,
                route: result.username
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

    getError: async function (req,res){
        res.render('error', {collectiontype: "user"});
    }
}

module.exports = timelineController;