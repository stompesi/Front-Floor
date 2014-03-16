var mysql = require('mysql');

exports.connection = getConnection('dev');

function getConnection(env){
    // 개발
    var dev = {
          host     : 'enterkey.kr',
          user     : 'frontfloor',
          password : 'frontfloor1',
          database : 'mr_pres'
    };
    // 운영 배포
    var prd = {
          host     : 'enterkey.kr',
          user     : 'frontfloor',
          password : 'frontfloor1',
          database : 'mr_pres'
    };
    
    var property = env=='dev'? dev : prd;
    return mysql.createConnection(property);
}

