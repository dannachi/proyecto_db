const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helloRouter = require('./routes/hello');
const indexRouter = require('./routes/index');
const crearRouter = require('./routes/crear');

const queryRouter = require('./routes/query');
const usuarioRouter = require('./routes/usuario');

const pet = require('./routes/pet');
const toy = require('./routes/toy');
const ptype = require('./routes/ptype');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hello', helloRouter);
app.use('/', indexRouter);
app.use('/crear', crearRouter);

app.use('/ejecutar_query', queryRouter);
app.use('/usuario', usuarioRouter);

app.use('/pet', pet);
app.use('/toy', toy);
app.use('/ptype', ptype);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
