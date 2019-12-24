let db = require('./config')

module.exports = function (app) {
    app.get('/result-page/list', function (req, res) {
        db.connetion.query('select nickname, mission_tx, start_time, end_time, result from user_info u, mission_result r where u.user_id = r.user_id;', function (err, rows, fields) {
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
                        "nickname": rows[i].nickname,
                        "mission_tx": rows[i].link_address,
                        "start_time": rows[i].start_time,
                        "end_time": rows[i].end_time,
                        "result": rows[i].result
                    }
                    console.log(lists);
                    json_object.push(lists);
                }
                res.send({
                    result_code: 200,
                    message: '성공',
                    data: json_object
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

    app.get('/result-page/search/:nickname', function (req, res) {
        m_nickname = req.params.nickname;
        db.connetion.query('select nickname, mission_tx, start_time, end_time, result from user_info u, mission_result r where u.user_id = r.user_id and u.nickname = ?;', [m_nickname], function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.send({
                    result_code: 500,
                    message: '에러'
                });
            }

            if (rows.length > 0) {
                const json_object = []
                // 결과값들을 모두 보내준다 
                for (var i = 0; i < rows.length; i++) {
                    var lists = {
                        "nickname": rows[i].nickname,
                        "mission_tx": rows[i].link_address,
                        "start_time": rows[i].start_time,
                        "end_time": rows[i].end_time,
                        "result": rows[i].result
                    }
                    console.log(lists);
                    json_object.push(lists);
                }
                res.send({
                    result_code: 200,
                    message: '성공',
                    data: json_object
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
}