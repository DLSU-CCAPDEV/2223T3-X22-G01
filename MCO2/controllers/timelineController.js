const timelineController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getTimelineReg: async function (req, res) {
        // var query for logged in (boolean)
        // var projection

        // var result = await db.findOne

        
        res.render('timeline');
    }
}

module.exports = timelineController;