/**
 * @author stompesi
 */

var testData = {
	userId : '1234',
	title : 'test',
};

var server = 'http://192.168.1.11';
var speaker = {
	socket : null,
	connectStatus : 'off',
	connectionKey : null
};

$(document).ready(function() {
	var connectStatus = speaker.connectStatus;

	// slideLeft : Left button event by user
	$('#slideLeft').click(function() {
		events.left[connectStatus]();
	});
	
	// slideRight : Right button event by user 
	$('#slideRight').click(function() {
		events.right[connectStatus]();
	});

	// slideShow : start presentation
	$('#slideShow').click(function() {
		if ($('#remoteControl').is(":checked") || $('#sync').is(":checked")) {
			events.socketInit();
			connectStatus = 'on';
		}
	});
});





/** Event Process **/
var events = {};

// Left Event
events.left = {};
events.left.on = function() {
	speaker.socket.emit('slideLeft', {
		connectionKey : speaker.connectionKey
	});
};
events.left.off = function() {
	alert('leftFromMe');
};

// Right Event
events.right = {};
events.right.on = function() {
	speaker.socket.emit('slideLeft', {
		connectionKey : speaker.connectionKey
	});
};
events.right.off = function() {
	alert('leftFromMe');
};

events.makeQRCode = function(connectionKey) {
	var qrcode = new QRCode("qrCode");
	qrcode.makeCode(server + "/rc/rc?connectionKey=" + connectionKey);
};


events.socketInit = function() {
	var socket = speaker.socket = io.connect(server),
		connectionKey = speaker.connectionKey;
	
	// makeRoom : user presentation room make 
	socket.emit('makeRoom', {
		userId : testData.userId,
		title : testData.title,
		connectType : 'PC',
	});
	socket.on('makeRoom', function(data) {
		if (data.status == 200) {
			connectionKey = data.data.connectionKey;
			
			/** choose **/
			//connection Type  : QRCode
			if ($('#remoteControl').is(":checked")) {
				events.makeQRCode(connectionKey);
			}
			//connection Type  : App - notThing
			
		} else {
			alert(data.errorMessage);
		}
	});

	// slideLeft : left event by server
	socket.on('slideLeft', function() {
		alert('left');
	});

	// slideRight : right event by server
	socket.on('slideRight', function() {
		alert('right');
	});
};