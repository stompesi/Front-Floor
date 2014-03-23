var connection = require('./connection.js').connection;


exports.login = function(req, res, next){
	var id = req.body.id;
	var password = req.body.password;
	
	var stmt = 'SELECT * from user_info where id=? and password=?';
	connection.query(stmt, [id, password], function(err, rows, fields) {
		if(err){
			throw new Error(err);
		}else{
			if ( rows.length === 1 ){
				res.locals.userInfo = {
					id : rows[0].id
				};
			}
		}
		next();
	});
};

exports.join = function(req, res, next){
	var userInfo = req.body;
	connection.query('INSERT INTO user_info SET ?', userInfo, function(err, result) {
	if(err){
		console.error(err);
		res.locals.err = err;
	}
	next();
	});
};