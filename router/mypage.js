let db = require('./config')

let DEBUG = false;

module.exports = function (app) {
    // 마이페이지 - 내 정보
    app.get('/mypage/info', function (req, res) {
        if (DEBUG) {
            console.log('mypage req.session.logined: ', req.session.logined);
        }
        if (!req.session.logined) {
            if (DEBUG) {
                console.log('if mypage req.session.logined: ', req.session.logined);
                console.log('if mypage req.session.user_id: ', req.session.user_id);
            }
            res.redirect('/login-page');
        }
        else {
            if (DEBUG) {
                console.log('else mypage req.session.logined: ', req.session.logined);
                console.log('else mypage req.session.user_id: ', req.session.user_id);
            }
            res.redirect('/mypage1');
        }
    });

    app.get('/mypage/info/list', function (req, res) {
        let m_user_id = req.session.user_id;
        db.connetion.query('select wallet_address, link_address from user_info where user_id = ?;', [m_user_id], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            if (rows.length > 0) {
                const json_object = []
                // 결과값들을 모두 보내준다 
                for (var i = 0; i < rows.length; i++) {
                    var lists = {
                        "wallet_address": rows[i].wallet_address,
                        "link_address": rows[i].link_address
                    }
                    console.log(lists);
                    json_object.push(lists);
                }
                res.send({
                    result_code: 200,
                    message: '성공',
                    list: json_object
                });
            }
            else {
                res.send({
                    result_code: 503,
                    message: '실패'
                });
            }
        });
    });

    // 마이페이지 - 내 기록
    app.get('/mypage/record', function (req, res) {
        if (!req.session.logined) {
            if (DEBUG) {
                console.log('if mypage req.session.logined: ', req.session.logined);
                console.log('if mypage req.session.user_id: ', req.session.user_id);
            }
            res.redirect('/login-page');
        }
        else {
            if (DEBUG) {
                console.log('else mypage req.session.logined: ', req.session.logined);
                console.log('else mypage req.session.user_id: ', req.session.user_id);
            }
            res.redirect('/mypage2');
        }
    });

    app.get('/mypage/record/list', function (req, res) {
        let m_user_id = req.session.user_id;
        db.connetion.query('select mission_tx, start_time, end_time, result from mission_result where user_id = ?;', [m_user_id], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            if (rows.length > 0) {
                const json_object = []
                // 결과값들을 모두 보내준다 
                for (var i = 0; i < rows.length; i++) {
                    var lists = {
                        "mission_tx": rows[i].mission_tx,
                        "start_time": rows[i].start_time,
                        "end_time": rows[i].end_time,
                        "result": rows[i].result
                    }
                    if (DEBUG) {
                        console.log(lists);
                    }
                    json_object.push(lists);
                }
                res.send({
                    result_code: 200,
                    message: '성공',
                    list: json_object
                });
            }
            else {
                res.send({
                    result_code: 503,
                    message: '실패'
                });
            }
        });
    });

    // 미션 수락/거절
    app.post('/mission/accept', function (req, res) {
        let m_mission_tx = req.body.mission_tx;
        let m_is_accept = req.body.is_accept;
        db.connetion.query('update mission_info set is_accept = ? where mission_tx = ?;', [m_is_accept, m_mission_tx], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            res.send({
                result_code: 200,
                message: '성공'
            });

        });
    });

    // 미션 시작
    app.post('/mission/start', function (req, res) {
        let m_mission_tx = req.body.mission_tx;
        let datetime = new Date();
        db.connetion.query('update mission_result set start_time = ? where mission_tx = ?', [datetime, m_mission_tx], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            res.send({
                result_code: 200,
                message: '성공'
            });
        });
    });

    // 미션 종료
    app.post('/mission/end', function (req, res) {
        let m_mission_tx = req.body.mission_tx;
        let datetime = new Date();
        db.connetion.query('update mission_result set end_time = ? where mission_tx = ?', [datetime, m_mission_tx], function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            // 미션이 종료되면 전적페이지와 미션내용을 비교한다.

            res.send({
                result_code: 200,
                message: '성공'
            });
        });
    });
}