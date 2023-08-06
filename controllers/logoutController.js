const logoutController = {

    getLogOut: function (req, res) {

        
        req.session.destroy(function(err) {
            if(err) throw err;

            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
            */
            res.redirect('/');
        });

    }

}

module.exports = logoutController;