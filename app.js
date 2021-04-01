require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index');
const passport = require('passport');
require('./app_api/config/passport');

var app = express();

app.use('/*', (req, res, next) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Origin,Accept,x-client-key,x-client-token,x-client-secret,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    res.header("Access-Control-Expose-Headers", "ETag");


    // Pass to next layer of middleware
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front-end', 'build')));


/*
app.use(function (req, res, next) {
    console.log("MADE IT TO EXPRESS", res.getHeaders());
    res.send("SUCCESS");
});
*/

app.use('/api', apiRouter);
app.get('/admin/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
});
app.get('/admin/location', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
});
app.get('/admin/location/add', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("CALLING A 404 ERROR");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;