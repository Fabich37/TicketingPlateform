var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var ticketsRouter = require('./routes/tickets');

var success = {
  status  : 200,
  success : 'User connected'
}

var app = express();

const USERS = [['fabienlavielle', 'fl@accessdelivery.fr', 'fabien'],
  ['christophercluck', 'cc@accessdelivery.fr', 'christopher'],
  ['bayebayesene', 'bbs@accessdelivery.fr', 'bayebaye']];
var userCheck = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      USERS.forEach(
          user =>{
            if(username == user[0] && password == user[2]){
              userCheck = true;
            }
          }
      )
      if(userCheck){
        return done(null, username);
      }else{
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    }
));

app.post('/',
    passport.authenticate('local', { successRedirect: '/tickets',
      failureRedirect: '/' }));

app.use('/', indexRouter);
app.use('/tickets', ticketsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
