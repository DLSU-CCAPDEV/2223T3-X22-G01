const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {
    getTimeline: async function (req, res) {
        //default user: Eve
        var loggedProj = 'username banner displayName';

        var userLoggedIn = await db.findOne(User, {username: "oO0Eve0Oo"}, loggedProj);


    }
}

module.exports = timelineController;