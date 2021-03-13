const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
//require('../models/users');//I ADDED THIS LINE. I'M NOT SURE WHY THIS WORKDS NOW.
const Admin = mongoose.model('Admin');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
(username, password, done) => {
    Admin.findOne({ email: username }, (err, admin) => {
        if (err) { return done(err); }
        if (!admin) {
            return done(null, false, {
                message: 'Incorrect Username.'
            });
        }
        if (!admin.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect Password.'
            });
        }
        return done(null, admin);
    });
}
));