/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var socket = require('./socket/socket');

/*
 * write enterkey
 */
var user = require('./routes/user.js')
var mainDB = require('./database/main.js')


//var app = express();

var app = require('express')(), server = require('http').createServer(app);

//socket
socket.init(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
ejs.open = '<?';
ejs.close = '?>';


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('frontfloor'));
app.use(express.session());
app.use(function(req, res, next){
	res.locals.session = req.session;
	next();
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


app.get('/pc', routes.pc);
app.get('/rc/rc', routes.rc);


// 로그인
app.post('/user/login', mainDB.login, user.login);
app.get('/user/logout', user.logout);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
