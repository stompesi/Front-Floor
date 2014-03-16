/**
 * @author stompesi
 */

exports.init = function(server) {
	var io = require('socket.io').listen(server);
	io.set('log level', 0);
	io.sockets.on('connection', function(socket) {
		
		// makeRoom : user presentation room make by speaker
		socket.on('makeRoom', function(data) {
			var path = process.cwd(),
				md5 = require(path + '/server/common/md5'),
				connectionKey = md5.md5(data.userId);
				returnData = {
					status : true,
					errorMessage : null,
					data : {
						connectionKey : connectionKey
					}
				};
			socket.join(connectionKey);
			socket.emit('makeRoom', returnData);
		});
		
		// join : audience or controller join the presentation
		socket.on('join', function(data) {
			var roomName =  '/' + data.connectionKey,
				isExistRoom = !!(socket.manager.rooms[roomName]),
				returnData = {
					status : true,
					errorMessage : null,
				};
			if(isExistRoom) {
				socket.join(data.connectionKey);	
			} else {
				returnData.status = false;
				returnData.errorMessage = "접속할수 없습니다.";
			}
			socket.emit('join', returnData);
		});
		
		// slideLeft : broadcast left event to all user in room 
		socket.on('slideLeft', function(data) {
			io.sockets. in (data.connectionKey).emit('slideLeft');
		});
	
		// slideLeft : broadcast right event to all user in room
		socket.on('slideRight', function(data) {
			io.sockets. in (data.connectionKey).emit('slideRight');
		});
		
		// dissconnect : process the user disconnect 
		socket.on('disconnect', function() {});
	});
}; 