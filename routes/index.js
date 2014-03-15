/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index.html');
};

exports.pc = function(req, res) {

	res.render('pc.html');
};

exports.rc = function(req, res) {
	res.locals.userId = req.query.userId;
	res.render('rc.html');
}; 