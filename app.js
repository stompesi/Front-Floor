/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var socket = require('./server/socket/socket.js');

/*
 * write enterkey
 */
var user = require('./routes/user.js');
var mainDB = require('./server/database/main.js');
var googleOauth = require('./server/oauth/google-oauth');
var localOauth = require('./server/oauth/local-oauth');

var app = require('express')(), server = require('http').createServer(app);

//socket
socket.init(server);

//setting
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.engine('.html', ejs.__express);
	ejs.open = '<?';
	ejs.close = '?>';
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(express.cookieParser('keyboard cat'));
	app.use(express.session());
	app.use(express.static(path.join(__dirname, '/public')));
	app.use(function(req, res, next) {
		res.locals.session = req.session;
		next();
	});
});
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// passport
googleOauth.init(app);
localOauth.init(app); 
app.use(app.router);

app.get('/pc', routes.pc);
app.get('/rc/rc', routes.rc);

// join & login test
app.get('/', routes.index);

// 회원가입
app.post('/user/join', mainDB.join, user.join);

// 로그인
app.post('/user/login', mainDB.login, user.login);
app.get('/user/logout', user.logout);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
