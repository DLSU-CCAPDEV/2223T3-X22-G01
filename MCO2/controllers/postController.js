const postController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getPostPage: async function (req, res) {
        // var query for logged in (boolean)
        // var projection

        // var result = await db.findOne

        
        res.render('post-page');
    }
}

module.exports = postController;