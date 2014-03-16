
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

//로그인
exports.login = function(req, res) {
	var result = false;
	if (res.locals.userInfo) {
		registSession(req, res);
		result = true;
	}
	res.send(result);
}

function registSession(req, res) {
	req.session.userInfo = res.locals.userInfo;
}

exports.logout = function(req, res) {
	clearSession(req);
	res.redirect('/');
}