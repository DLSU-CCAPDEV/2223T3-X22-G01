const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const timelineController = {
    getFavicon: function(req, res) {
        res.status(204);
    },

    getTimeline: async function (req, res) {
        //default user: oO0Eve0Oo
        var loggedIn = req.session.username != null;

        var loggedProj = 'username icon banner displayName';
        var postProjection = 'votes username _id title date comments deleted';
        var iconProjection = 'username icon'

        var search = req.query.search;
        var sortBy = req.query.sortBy;

        if(!search) search = '';

        if (loggedIn) {
            var userLoggedIn = await db.findOne(User, {username: req.session.username}, loggedProj);
            var loggedPostCt = await Post.countDocuments({username: userLoggedIn.username}).exec();
            if (!userLoggedIn) loggedIn = false;
        }

        var posts = await db.findMany(Post, {"description" : {$regex : search}}, postProjection);
        
        //sort posts
        if (sortBy){
            var post2 = posts;
            switch(sortBy) {
                case 'popular':
                    post2.sort((a, b) => {
                        var aVote = 0;
                        var bVote = 0;

                        a.votes.forEach((element) => {
                            if (!element.deleted) aVote += element.voteDir ? 1 : -1;
                        });
                        b.votes.forEach((element) => {
                            if (!element.deleted) bVote += element.voteDir ? 1 : -1;
                        });


                        return bVote - aVote;
                    });
                    break;
                case 'recent':
                    post2.sort((a, b) => {
                        return b.date - a.date;
                    });
                    break;
                case 'unpopular':
                    post2.sort((a, b) => {
                        var aVote = 0;
                        var bVote = 0;

                        a.votes.forEach((element) => {
                            if (!element.deleted) aVote += element.voteDir ? 1 : -1;
                        });
                        b.votes.forEach((element) => {
                            if (!element.deleted) bVote += element.voteDir ? 1 : -1;
                        });


                        return aVote - bVote;
                    });
                    break;
                case 'old':
                    post2.sort((a, b) => {
                        return a.date - b.date;
                    });
                    break;
                
                default:
                    //sort by id
                    post2.sort((a, b) => {
                        return a.id - b.id;
                    });
            }
            posts = post2;
        }


        var userIcon = await db.findMany(User, {}, iconProjection);

        var postObject = posts.map((eachPost) => {
            var postIcon = userIcon.find((user) => user.username == eachPost.username);
            
            var voteCount = 0;
            var userUpvote = false;
            var userDownvote = false;

            eachPost.votes.forEach((element) => {
                if (!element.deleted) voteCount += element.voteDir ? 1 : -1;
                if(loggedIn){
                    if (element.username == userLoggedIn.username) {
                        userUpvote = element.voteDir && !element.deleted;
                        userDownvote = !element.voteDir && !element.deleted;
                    }
                }
            });

            return {
                numComments: eachPost.comments.length,
                votes: voteCount,
                postID: eachPost._id,
                username: eachPost.username,
                userUpvote: userUpvote,
                userDownvote: userDownvote,
                
                title: eachPost.title,
                date: new Date(eachPost.date).toDateString(),
                icon: postIcon.icon,
                notDeleted: !eachPost.deleted,
                loggedIn: loggedIn
            }
        });
        
        var details = {
            loggedIn: false,
            posts: postObject,
            search: search
        };

        if(loggedIn) {

            details = {
                loggedIn: true,
                loggedUsername: userLoggedIn.username,
                displayName: userLoggedIn.displayName,
                profileIcon: userLoggedIn.icon,
                numPosts: loggedPostCt,
                banner: userLoggedIn.banner,
                posts: postObject,
                search: search
            }
        }  

        res.render('timeline', details);

    }
}

module.exports = timelineController;