var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxy = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var activityRouter = require('./routes/activity');
var activitydetailsRouter = require('./routes/activitydetails')
var worksRouter = require('./routes/works')
var matchDetailRouter = require('./routes/matchDetail')
var jobDetailRouter = require('./routes/jobDetail')
var app = express();
app.use(history());

app.use(
  '/api',
  proxy({ target: 'https://api.zcool.com.cn/v2', changeOrigin: true })
)
app.use('/getMemberDescription',
  proxy ({
    target: 'https://www.zcool.com.cn',
    changeOrigin: true
  }))
app.use('/job/api',proxy({
  target: 'https://m.zcool.com.cn',
  changeOrigin: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/activity',activityRouter);
app.use('/activitydetails',activitydetailsRouter)
app.use('/matchDetail',matchDetailRouter)
app.use('/works', worksRouter)
app.use('/jobDetail', jobDetailRouter)


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
