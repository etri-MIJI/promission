let db = require('./config')
const session = require('express-session'); // 로그인 세션 유지를 위해 필요
const FileStore = require('session-file-store')(session);
let debug = true;

module.exports = function (app) {

    app.use(session({
        secret: 'dbswnchlrh', // 세션을 암호화해줌. secret 필수 옵션, 노출되면 안 된다
        resave: false, // 세션을 항상 저장할지 여부를 정하는 값
        saveUninitialized: true, // 초기화되지 않은 채 스토어에 저장되는 세션. 세션이 필요하기 전까지 세션을 구동시키지 않음
        store: new FileStore() // 데이터를 저장하는 형식
    }))

    // id 중복 확인
    app.post("/user/check/id", function (req, res) {
        let m_user_id = req.body.user_id;

        db.connetion.query('select user_id from user_info where user_id = ?;',[m_user_id], function (err, rows, fields) {
            if (debug) {
                console.log('rows :', rows);
                console.log('fields :', fields);
            }

            if (err) {
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows[0]) {
                    res.send({
                        result_code: 503,
                        message: "중복된 아이디 존재"
                    });
                }
                else {
                    res.send({
                        result_code: 200,
                        message: "가입 가능한 아이디"
                    });
                }
            }
        });
    });

    // 닉네임 중복 확인
    app.post("/user/check/nickname", function (req, res) {
        let m_nickname = req.body.nickname;

        db.connetion.query('select nickname from user_info where nickname = ?;',[m_nickname], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows[0]) {
                    res.send({
                        result_code: 503,
                        message: "중복된 닉네임 존재"
                    });
                }
                else {
                    res.send({
                        result_code: 200,
                        message: "가입 가능한 닉네임"
                    });
                }
            }
        });
    });

    // 회원가입
    app.post("/user/register", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_nickname = req.body.nickname;
        let m_password = req.body.password;
        let m_wallet_address = req.body.wallet_address;
        let m_email = req.body.email;
        let m_game_id = req.body.game_id;

        if (debug) {
            console.log("user_id", m_user_id);
            console.log("m_nickname", m_nickname);
            console.log("m_password", m_password);
            console.log("m_wallet_address", m_wallet_address);
            console.log("m_email", m_email);
            console.log("m_game_id", m_game_id);
        }

        // DB에 저장
        db.connetion.query('insert into user_info(user_id, nickname, password, wallet_address, email, link_address, game_id) values (?,?,?,?,?, "http://52.78.198.204:3000/' + m_user_id + '",?);',[m_user_id, m_nickname, m_password, m_wallet_address, m_email, m_game_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
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
        });
    });

    // 로그인
    app.post("/user/login", function (req, res) {
        let m_user_id = req.body.user_id;
        let m_password = req.body.password;

        // DB에 저장된 내용과 비교
        db.connetion.query('select user_id, password from user_info where user_id = ? and password = ?;', [m_user_id, m_password], function (err, rows) {
            //console.log("rows ",rows[0]);
            if (err) {
                console.log(err);
                res.send({
                    result_code: 500,
                    message: "에러"
                });
            }
            else {
                if (rows.length > 0) {
                    //console.log(rows[0]);
                    // 세션 데이터 저장
                    req.session.logined = true;
                    req.session.user_id = m_user_id;
                    // session store 저장 시작
                    // 저장이 끝난 뒤 redirect
                    req.session.save(() => {
                        res.send({
                            result_code: 200,
                            message: "로그인 성공"
                        });
                        //res.redirect('/');
                    });
                }
                else {
                    res.send({
                        result_code: 503,
                        message: "로그인 실패"
                    });
                }
            }
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
    app.put("/user/password/change", function (req, res) {

    });

    // 서비스 탈퇴
    app.post("/user/leave", function (res) {
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });
}