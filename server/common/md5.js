/**
 * @author stompesi
 */
exports.md5 = function(key) {
	var crypto = require('crypto'),
		md5hash = crypto.createHash('md5');
	md5hash.update(key);
	return md5hash.digest('hex');
};