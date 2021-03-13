const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var Schema = mongoose.Schema;

const openTimesSchema = new mongoose.Schema({
    sun: {open: String, close: String},
    mon: {open: String, close: String},
    tue: {open: String, close: String},
    wed: {open: String, close: String},
    thu: {open: String, close: String},
    fri: {open: String, close: String},
    sat: {open: String, close: String},
});

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    coords: {
        type: { type: String },
        coordinates: { type: [Number], required: true },
    },
    notes: { type: String, required: false },
    openTimes: openTimesSchema,
});
locationSchema.index({ coords: '2dsphere' });
//longitude (valid values(-180, 180)) latitude (valid values(-90, 90))

mongoose.model('Location', locationSchema);