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
	res.locals.connectionKey = req.query.connectionKey;
	res.render('rc.html');
}; 