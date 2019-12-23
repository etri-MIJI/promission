var mysql = require('mysql');
require('dotenv').config()

// 커넥션을 정의합니다.
// RDS Console 에서 본인이 설정한 값을 입력해주세요.
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});
//let db = require('./login')(connection);

// RDS에 접속합니다.
connection.connect(function (err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속
    console.log("데이터베이스 접속 완료");

    /*
    connection.query("SELECT * FROM fruit", function(err, rows, fields) {
      console.log(rows); // 결과를 출력합니다!
    });
    */
  }
});

module.exports.connetion = connection; 