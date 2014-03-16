/**
 * @author stompesi
 */

$(document).ready(function() {
	var server = 'http://192.168.1.11',
		socket = io.connect(server),
		connectionKey = $('#connectionKey').val();

	// Join : 해당 사용자의 Remote Control 접속 
	$('#connection').click(function() {
		socket.emit('join', {
			connectionKey : connectionKey
		});
	});
	socket.on('join', function(data) {
		if (data.status) {
			alert('접속성공');
		} else {
			alert('다시연결해주시기 바랍니다');
		}
	});

	// slideLeft : left 이벤트 (통신)
	$('#slideLeft').click(function() {
		socket.emit('slideLeft', {
			connectionKey : connectionKey
		});
	});
	socket.on('slideLeft', function() {
		alert('left');
	});
	
	// slideLeft : left 이벤트 (통신)
	$('#slideRight').click(function() {
		socket.emit('slideRight', {
			connectionKey : connectionKey
		});
	});
	socket.on('slideRight', function() {
		alert('right');
	});
});
