//module.exports = init;
var path = process.cwd();
var connection = require(path + '/server/database/connection.js').connection;

exports.init = function(app) {
	var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
		usernameField : 'userId'
	}, function(userId, password, done) {
		console.log('local strategy called');
		connection.query('SELECT * FROM user_info WHERE id = ? AND password = ?', [userId, password], function(err, results) {
			console.log(results);
			if (results.length == 0) {
				return done(null, false, false);
			} else {
				return done(null, results);
			}
		});
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			var result = {
				status : false,
				errorMessage : ''
			};
		if (err) { return res.send(result); }
		if (!user) { return res.send(result); }
		user[0].userId = user[0].id;
		delete user[0].idx;
		delete user[0].password;
		delete user[0].id;
		req.logIn(user, function(err) {
		if (err) { return res.send(result); }
		result.status = true;
		return res.send(result);
		});
		})(req, res, next);
	});
}

