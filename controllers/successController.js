const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const successController = {

    getSuccess: async function (req, res) {

        var projection = 'icon';
        var postProjection = 'id title votes date comments';
        
        var postArray = await db.collectionToArray("posts");
        var userArray = await db.collectionToArray("users");

        var query = {username: "oO0Eve0Oo"};
        var postsByLoggedIn = await db.collectionToArray("posts", query);
        var postCount = postsByLoggedIn.length;

        //projection
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
                icon: icon,
                route: "/home"
            }
        });
        
        if(userArray != null || postArray != null){
            var details = {
                //default user: oO0Eve0Oo
                username: "oO0Eve0Oo",
                banner: "banner_eve.jpg",
                displayName: "Eve",
                numPosts: postCount,

                posts: postProj,

                // icon: posterIcon.icon,
                
            };

            res.render('timeline', details);
        }

        else{
            res.render('error', {collectionType: "page"});
        }
    }

}

module.exports = successController;
