/**
 * @author stompesi
 */

$(document).ready(function() {
	$("#loginBtn").bind("click", function(e) {
		var url = "/user/login",
			type = $('#type').val(),
			loginInfo = $('#loginForm').serialize();
		e.preventDefault();
		$.post(url, loginInfo, function(result) {
			if (result.status) {
				location.reload();
			} else {
				alert(result.errorMessage);
			}
		});
	});
});