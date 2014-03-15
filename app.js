/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

//var app = express();

var app = require('express')(), server = require('http').createServer(app), io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
ejs.open = '<?';
ejs.close = '?>';

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

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

io.set('log level', 0);
io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
		socket.join('room');
	});
	
	socket.on('makeRoom', function(data) {
		socket.join(data.id);
		if(data.connectType === 'Mobile') {
			socket.emit('makeRoom', {
				status : 200
			});
		}
	});
	// on broadcast
	socket.on('slideLeft', function(data) {
		io.sockets.in(data.id).emit('slideLeft');
	});

	socket.on('slideRight', function(data) {
		io.sockets.in(data.id).emit('slideRight');
	});
});
