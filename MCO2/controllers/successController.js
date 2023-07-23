const successController = {

    getSuccess: function (req, res) {

        var details = {
            name: req.query.name,
            username: req.query.username
        };

        res.render('success', details);
    }

}

module.exports = successController;
