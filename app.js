var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lectureRouter = require('./routes/lecture');
var projectRouter = require('./routes/project');
var studyRouter = require('./routes/study');
var communityRouter = require('./routes/community');
var boardRouter = require('./routes/board');
var scheduleRouter = require('./routes/schedule')
//var mysqlRouter = require('./routes/mysql');

const cors = require('cors');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
createSession = () =>  {
	return function (req, res, next) {
		if (!req.session.login) {
			req.session.login = 'logout';
		}
		next();
	};
};
app.use(session({
	secret: '1234DSFs@adf1234!@#$asd',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 600000 },
}));
app.use(createSession());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lecture', lectureRouter);
app.use('/project', projectRouter);
app.use('/study', studyRouter);
app.use('/community', communityRouter);
app.use('/board', boardRouter);
app.use('/schedule', scheduleRouter);
//app.use('/mysql', mysqlRouter);

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