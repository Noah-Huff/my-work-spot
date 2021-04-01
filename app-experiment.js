require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index');
const passport = require('passport');
require('./app_api/config/passport');

var app = express();
app.use(cors());


console.log("!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^^^^!!!!!!!!!!!!!!!!!!!!!");


app.use('/*', (req, res, next) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Origin,Accept,x-client-key,x-client-token,x-client-secret,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front-end', 'build')));



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
