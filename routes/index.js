// ***** pc *****

// Temp Handdler of detailView
exports.pc = function(req, res) {
	res.render('pc.html');
};

// ***** controller ***** 

/** controller process by login **/
exports.rc = function(req, res) {
	var path = process.cwd(),
		userInfo = req.session.userInfo,
		md5 = require(path + '/server/common/md5');
	if(!!(userInfo)) {
		res.locals.connectionKey = md5.md5(userInfo.id); 
	}
	res.render('rc.html');
};

/** controller process by QRCode **/ 
// exports.rc = function(req, res) {
	// res.locals.connectionKey = req.query.connectionKey;
	// res.render('rc.html');
// };