const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const bcrypt = require('bcrypt');

const loginController = {
    getLogin: async function (req,res) {
        res.render('login');
    },

    postLogin: async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        var projection = 'username displayName password';

        var result = await db.findOne(User, {username: username}, projection);

        if(result) {
            var user = {
                username: result.username,
                displayName: result.displayName
            };

            var pwCompare = await bcrypt.compare(password, result.password);

            if(pwCompare) {
                req.session.username = user.username;
                req.session.displayName = user.displayName;

                res.redirect('/profile/' + user.username);
            } else {
                res.render('login');
            }

        }
    }
}

module.exports = loginController;