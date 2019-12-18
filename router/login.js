let db = require('./config')

module.exports = function (app) {
    app.get('/', function (req, res){
        console.log('message ');
    });

    // 회원가입
    app.post("/user/register", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_nickname = req.body.nickname;
        let m_password = req.body.password;
        let m_wallet_address = req.body.wallet_address;
        let m_email = req.body.email;
        let m_game_id = req.body.game_id;

        console.log("user_id", m_user_id);
        console.log("m_nickname", m_nickname);
        console.log("m_password", m_password);
        console.log("m_wallet_address", m_wallet_address);
        console.log("m_email", m_email);
        console.log("m_game_id", m_game_id);


        // DB에 저장
        db.db.query('INSERT INTO USER_INFO(user_id, nickname, password, wallet_address, email) VALUES ("' + m_user_id + '","' + m_nickname + '","' + m_password + '","' + m_wallet_address + '","' + m_email + '")', function(err, rows, fields){
            if(err) {
                res.send({
                    result_code: 503,
                    message: '회원가입 실패'
                });
            }
            else {
                res.send({
                    result_code: 200,
                    message: '회원가입 성공'
                });
            }
        })
    });

    // 로그인
    app.post("/user/login", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_password = req.body.password;

        // DB에 저장된 내용과 비교


        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 로그아웃
    app.post("/user/logout", function (res) {
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 비밀번호 찾기 (로그인 전)
    app.put("/user/password/find", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_email = req.body.email;

        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 비밀번호 변경 (로그인 후)
    app.put("/user/password/change", function (req, res){

    });

    // 비밀번호 변경

    // 서비스 탈퇴
    app.post("/user/leave", function (res) {
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });
}