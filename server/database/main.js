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
}
