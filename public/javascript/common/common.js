/**
 * @author stompesi
 */

$(document).ready(function() {
	$("#loginBtn").bind("click", function(e) {
		var url = "/user/login";
		var type = $('#type').val();
		e.preventDefault();
		var joinInfo = $('#loginForm').serialize();
		$.post('/user/login', joinInfo, function(result) {
			if (result.status) {
				// location.reload();
				callback.login[type](result.data);
			} else {
				alert(result.errorMessage);
			}
		});
	});
});


var callback = {};
callback.login = {};

callback.login.pc = function(data) {
	location.reload();
};

callback.login.controller = function(data) {
	location.href = "/rc/rc?connectionKey=" + data.connectionKey;
};
