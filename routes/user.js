
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


function md5(key) {
	var crypto = require('crypto');
	var md5hash = crypto.createHash('md5');
	md5hash.update(key);
	return md5hash.digest('hex');
}


//로그인
exports.login = function(req, res) {
	var userInfo = res.locals.userInfo;
	var result = {
		status : false,
		errorMessage : null,
		data : {}
	};
	if (!!(userInfo)) {
		registSession(req, userInfo);
		result.status = true;
		result.data.connectionKey = md5(userInfo.id);
	} else {
		result.errorMessage = "아이디 / 비밀번호를 확인하여주세요.";
	}
	res.send(result);
};

function registSession(req, userInfo) {
	req.session.userInfo = userInfo;
}

exports.logout = function(req, res) {
	clearSession(req);
	res.redirect('/');
};