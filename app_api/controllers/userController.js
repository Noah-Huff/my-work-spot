const passport = require('passport');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const Admin = mongoose.model('Admin');

/*
const _getAdmin = (req, res, callback) => {
    if ( req.payload && req.payload.email ) {
        Admin.findOne({ email: req.payload.email })
        .exec( ( err, admin ) => {
            if ( !admin ) {
                return res.status(404).json( { "message" : "Not an admin user" } );
            } else if ( err ) {
                console.log(err);
                return res.status(404).json(err);
            }
        });
    } else {
        return res.status(404).json( { "message" : "User not found " } );
    }
}
*/

const createAdmin = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message": "All fields required!"});
    }
    const admin = new Admin();
    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.setPassword(req.body.password);
    admin.save((err, admin) => {
        if (err) {
            res
            .status(404)
            .json(err);
        } else {
            const token = admin.generateJwt();
            res
            .status(200)
            .json({token});
        }
    });
};

const authUser = asyncHandler(async (req, res) => {
    if (req.body.email.length <= 1 || req.body.password == '' || req.body.name == '') {
        return res
        .status(400)
        .json({"message": "All fields required."});
    }
    passport.authenticate('local', (err, admin, info) => {
        let token;
        if (err) {
            return res
            .status(404)
            .json(err);
        }
        if (admin) {
            token = admin.generateJwt();
            res
            .status(200)
            .json({token});
        } else {
            res
            .status(401)
            .json(info);
        }
    })(req, res);
});


const adminLogin = {

};

const adminViewLocations = {

};

const adminDeleteLocation = {

};

const adminAddLocation = {

};



module.exports = {
    createAdmin,
    authUser
};
