const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            let generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(
                function(user) {
                    if (user) {
                        return done(null, false, {
                            message: 'That email is already taken'
                        });
                    } else {
                        let userPassword = generateHash(password);
                        let data = {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                        };

                        User.create(
                            data
                        ).then(
                            function(newUser, created) {
                                if (!newUser) {
                                    return done(null, false);
                                }

                                if (newUser) {
                                    return done(null, newUser);
                                }
                            });
                    }
                });
        }
    ));

    // local sign in
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            const User = user;
            const isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                let userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {
                console.log('Error:', err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));

    // serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}