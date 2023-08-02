const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const signupController = {
    getSignUp: async function (req, res) {
        res.render('signup');
    },

    postSignUp: async function (req, res) {
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;

        var user = {
            username: username,
            displayName: name,
            bio: "Hi, ka-Adult!",
            icon: "pfp_" + name + ".jpg",
            banner: "banner_" + name + ".jpg",
            password: password
        }

        var newUser = await db.insertOne(User, user);

        if(newUser != null) {
            res.redirect('/home');
        } else {
            var error = {
                collectionType: "page",
                route: "/"
            }
            res.render('error', error);
        }
    }

}

module.exports = signupController;