
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.pc = function(req, res){
  res.render('pc.html');
};

exports.mobile = function(req, res){
  res.render('mobile.html');
};