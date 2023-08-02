const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const loginController = {
    getLogin: async function (req,res) {
        res.render('login');
    }
}

module.exports = loginController;