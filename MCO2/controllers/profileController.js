/*

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

*/

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {
    getProfile: async function (req, res) {

        // query where `idNum` is equal to URL parameter `idNum`
        var u = req.params.username;
        var query = {username: u};

        // fields to be returned
        var projection = 'username displayName bio icon banner';

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function searches the collection `users`
            based on the value set in object `query`
            the third parameter is a string containing fields to be returned
        */
        db.findOne('users', query, function (result) {
            if(result != null) {
                var details = {
                    username: result.username,
                    displayName: result.displayName,
                    bio: result.bio,
                    icon: result.icon,
                    banner: result.banner
                };
    
                // render `../views/profile.hbs`
                res.render('profile-page', details);
            }
    
            /*
                if the user does not exist in the database
                render the error page
            */
            else {
                res.render('error');
            }
        });
        
    }
}

module.exports = profileController;