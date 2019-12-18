var mysql = require('mysql');

// 커넥션을 정의합니다.
// RDS Console 에서 본인이 설정한 값을 입력해주세요.
var db = mysql.createConnection({
    host: "",
    user: "admin",
    password: "",
    database: "promission",
    port:"3306"
  });

  //let db = require('./login')(connection);
  
  // RDS에 접속합니다.
  db.connect(function(err) {
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