const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoStorage = require('./storage/mongo.storage');

const routes = require('./routes/index');

const app = express();

// set environment
const env = process.env.NODE_ENV || 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));
app.use("/node_modules", express.static('node_modules'));
app.use("/client", express.static('client'));
// livereload
if (env === 'development') {
  app.use(require('connect-livereload')({
    port: 35729
  }));
}

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//db connection
mongoStorage.connect()
    .then(() => console.log('db connected successfully'))
    .catch((err) => console.log('db connection failed', err));

module.exports = app;
