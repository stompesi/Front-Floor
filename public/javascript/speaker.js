/**
 * @author stompesi
 */
var speaker = {
	socket : null,
	syncStatus : 'off'
};

var buttonEvent = {
	left : {},
	right : {}
};

buttonEvent.left.on = function() {
	speaker.socket.emit('slideLeft', {
		id : '1234'
	});
};

buttonEvent.left.off = function() {
	alert('leftFromMe');
};

buttonEvent.right.on = function() {
	speaker.socket.emit('slideLeft', {
		id : '1234'
	});
};

buttonEvent.right.off = function() {
	alert('leftFromMe');
};

$(document).ready(function() {
	// $(#.sync).is(":checked") == true :
	var syncStatus = speaker.syncStatus;

	$('#slideLeft').click(function() {
		buttonEvent.left[syncStatus]();
	});

	$('#slideRight').click(function() {
		buttonEvent.right[syncStatus]();
	});

	$('#slideShow').click(function() {
		if ($('#remoteControl').is(":checked") || $('#sync').is(":checked")) {
			if ($('#remoteControl').is(":checked")) {
				var qrcode = new QRCode("qrCode");
				qrcode.makeCode("http://192.168.1.11:3000/rc/rc?userId=1234");
			}
			socketInit();
			syncStatus = 'on';
		}
	});
});

function makeQRCode() {
	var qrcode = new QRCode("qrCode");
	qrcode.makeCode("http://192.168.1.11:3000/rc/rc?userId=1234");
}

function socketInit() {
	var socket = speaker.socket = io.connect('http://localhost');

	socket.emit('makeRoom', {
		id : '1234'
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
}

//makeCode();