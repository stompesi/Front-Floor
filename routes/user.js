
/*
 * GET users listing.
 */

// 회원가입
exports.join = function(req, res) {
	var result = {};
	if (res.locals.err) {
		result.status = false;
		result.errorMessage = "회원가입 실패"; 
		res.send(result);
	} else {
		result.status = true;
		result.errorMessage = "회원가입 성공, 로그인 하세요.";
		res.send(result);
	}
}

//로그인
exports.login = function(req, res) {
	var userInfo = res.locals.userInfo,
		result = {};
	if (!!(userInfo)) {
		registSession(req, userInfo);
		result.status = true;
	} else {
		result.status = false;
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

function clearSession(req) {
	delete req.session.userInfo;
}

exports.list = function(req, res){
  res.send("respond with a resource");
};


