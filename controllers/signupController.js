const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signupController = {
    getSignUp: async function (req, res) {
        

        res.render('signup');
    },

    postSignUp: async function (req, res) {
        var errors = validationResult(req);

        // if there are validation errors
        if (!errors.isEmpty()) {

            // get the array of errors
            errors = errors.errors;

            /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg`
                as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].path + 'Error'] = errors[i].msg;

            /*
                render `../views/signup.hbs`
                display the errors defined in the object `details`
            */
            res.render('signup', details);
        }

        else {
            /*
                when submitting forms using HTTP POST method
                the values in the input fields are stored in `req.body` object
                each <input> element is identified using its `name` attribute
                Example: the value entered in <input type="text" name="fName">
                can be retrieved using `req.body.fName`
            */
            var name = req.body.name;
            var username = req.body.username;
            var password2 = req.body.password2;

            var hashPW = await bcrypt.hash(password2, saltRounds);

            var user = {
                displayName: name,
                username: username,
                bio: "Hi, ka-Adult!",
                password: hashPW,
                icon: "pfp_" + username + ".jpg",
                banner: "banner_" + username + ".jpg"
            }

            /*
                calls the function insertOne()
                defined in the `database` object in `../models/db.js`
                this function adds a document to collection `users`
            */
            var response = await db.insertOne(User, user);

            /*
                upon adding a user to the database,
                redirects the client to `/success` using HTTP GET,
                defined in `../routes/routes.js`
                passing values using URL
                which calls getSuccess() method
                defined in `./successController.js`
            */

            if(response != null){
                // new session
                req.session.username = user.username;
                req.session.displayName = user.displayName;

                res.redirect('/home');
            }
            else {
                res.render('error');
            }
        }
        
        
        
        // var name = req.body.name;
        // var username = req.body.username;
        // var password = req.body.password;

        // var user = {
        //     username: username,
        //     displayName: name,
        //     bio: "Hi, ka-Adult!",
        //     icon: "pfp_" + name + ".jpg",
        //     banner: "banner_" + name + ".jpg",
        //     password: password
        // }

        // var newUser = await db.insertOne(User, user);

        // if(newUser != null) {
        //     res.redirect('/home');
        // } else {
        //     var error = {
        //         collectionType: "page",
        //         route: "/"
        //     }
        //     res.render('error', error);
        // }
    },

    getCheckUsername: async function (req, res) {
        var username = req.query.username;

        var result = await db.findOne(User, {username: username}, 'username');
        res.send(result);
    }

}

module.exports = signupController;