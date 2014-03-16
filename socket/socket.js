/**
 * @author stompesi
 */

function md5(key) {
	var crypto = require('crypto');
	var md5hash = crypto.createHash('md5');
	md5hash.update(key);
	return md5hash.digest('hex');
}

exports.init = function(server) {
	var io = require('socket.io').listen(server);
	io.set('log level', 0);
	io.sockets.on('connection', function(socket) {
		
		
		socket.on('makeRoom', function(data) {
			var connectionKey = md5(data.userId);
			var returnData = {
				status : 200,
				errorMessage : null,
				data : {
					connectionKey : connectionKey
				}
			};
			socket.join(connectionKey);
			socket.emit('makeRoom', returnData);
		});
		
		socket.on('join', function(data) {
			var roomName =  '/' + data.connectionKey;
			var isExistRoom = !!(socket.manager.rooms[roomName]);
			
			var returnData = {
				status : 200,
				errorMessage : null,
				data : {}
			};
			if(isExistRoom) {
				socket.join(data.connectionKey);	
			} else {
				returnData.status = 500;
				returnData.errorMessage = "접속할수 없습니다.";
			}
			
			socket.emit('join', returnData);
		});
		
		
		// on broadcast
		socket.on('slideLeft', function(data) {
			io.sockets. in (data.connectionKey).emit('slideLeft');
		});

		socket.on('slideRight', function(data) {
			io.sockets. in (data.connectionKey).emit('slideRight');
		});
		
		socket.on('disconnect', function() {
			//socket.leave(data.room);
		});
	});
}; 