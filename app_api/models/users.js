const mongoose = require('mongoose');
const crypto = require('crypto');
//const jwt = require('jsonwebtoken');

const userSymptomSchema = new mongoose.Schema ({
    chills: {Type: Boolean, default: false},
    headache: {Type: Boolean, default: false},
    congestion: {Type: Boolean, default: false},
    muscleAche: {Type: Boolean, default: false},
    cough: {Type: Boolean, default: false},
    vomitting: {Type: Boolean, default: false},
    diarrhea: {Type: Boolean, default: false},
    lossOfSmell: {Type: Boolean, default: false},
    fatigue: {Type: Boolean, default: false},
    difficultBreathing: {Type: Boolean, default: false},
    fever: {Type: Boolean, default: false},
    soreThroat: {Type: Boolean, default: false},

});

const appointmentSchema = new mongoose.Schema ({
    appointment: {type: Date, default: Date.now}
});

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    userSymphons: userSymptomSchema,
    appointment: [appointmentSchema]
});


userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function (password) {
        const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
        return this.hash === hash;
    };

    userSchema.methods.generateJwt = function () {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign ({
            _id: this._id,
            email: this.email,
            name: this.name,
            exp: parseInt(expiry.getTime() / 1000, 10),
        }, process.env.JWT_SECRET);
    };

    mongoose.model('User', userSchema);
