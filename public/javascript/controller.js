/**
 * @author stompesi
 */

$(document).ready(function() {
	var socket = io.connect('http://192.168.1.11');

	socket.emit('makeRoom', {
		id : $('#room').val(),
		connectType : 'Mobile'
	});
	socket.on('makeRoom', function(data) {
		if (data.status == 200) {
			alert('연결성공');
		}
	});

	socket.on('slideLeft', function() {
		alert('left');
	});

	socket.on('slideRight', function() {
		alert('right');
	});

	$('#slideLeft').click(function() {
		alert('1');
		socket.emit('slideLeft', {
			id : '1234'
		});
	});

	$('#slideRight').click(function() {
		socket.emit('slideRight', {
			id : '1234'
		});
	});
});
