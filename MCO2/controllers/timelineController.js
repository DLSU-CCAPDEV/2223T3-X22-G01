const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getTimeline: async function (req, res) {
        // var query = db.getCollectionInfos();

        var projection = 'id title username votes date comments';
        var postProjection = 'id title votes date comments';

        // var result = await db.findMany(User, query, projection);
        // var postResult = await db.findMany(Post, query, postProjection);
        var result = await User.find();
        var postResult = await Post.find();

        if(result != null || postResult != null){
            var details = {
                username: result.username,
                displayName: result.displayName,
                bio: result.bio,
                icon: result.icon,
                banner: result.banner,
                postID: postResult._id,
                title: postResult.title,
                votes: postResult.votes,
                date: postResult.date,
                // numComments: postResult.comments.length
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