//module.exports = init;
exports.init = function(app) {
	var pkginfo = require('./package');
	var passport = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());
	var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	passport.use(new GoogleStrategy({
		clientID : pkginfo.oauth.google.GOOGLE_APP_ID,
		clientSecret : pkginfo.oauth.google.GOOGLE_APP_SECRET,
		callbackURL : pkginfo.oauth.google.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		//
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// req.session.passport 정보를 저장하는 단계이다.
		// done 메소드에 전달된 정보가 세션에 저장된다.
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.dir(profile);
		var userInfo = {};
		
		userInfo.userId = profile.id;
		userInfo.userEmail = profile.emails[0].value;
		userInfo.name = profile.displayName;
		//
		return done(null, userInfo);
	}));

	app.get('/auth/google', passport.authenticate('google', {
		scope : ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
	}));

	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/',
		failureRedirect : '/'
	}));
	
	app.get('/logout', function(req, res) {
		//
		// passport 에서 지원하는 logout 메소드이다.
		// req.session.passport 의 정보를 삭제한다.
		//
		req.logout();
		res.redirect('/');
	});
}

