module.exports = {
    homepage: function(req, res) {
        res.render('homepage');
    },
    login: function(req, res) {
        if (req.isAuthenticated()) {
            res.render('form', {
                id: req.user.id
            });
        } else {
            res.render('login');
        }
    },
    signup: function(req, res) {
        res.render('signup');
    },
    signin: function(req, res) {
        res.render('signin');
    },
    dashboard: function(req, res) {
        res.render('dashboard', {
            id: req.user.id
        });
    },
    form: function(req, res) {
        res.render('form', {
            id: req.user.id
        });
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    }
}