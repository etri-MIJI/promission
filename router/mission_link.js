let db = require('./config')

module.exports = function (app) {
    // 미션 링크 페이지 접속했을 때 뜨는 최초의 링크 목록
    app.get('/link-page/list', function (req, res) {
        console.log('link page list');
        db.connetion.query('select nickname, link_address from user_info', function (err, rows, fields) {
            if (err) {
                res.send({
                    result_code: 500,
                    message: '에러'
                });
                return;
            }

            if (rows.length > 0) {
                //console.log(rows);
                const json_object = []
                // 결과값들을 모두 보내준다 
                for (var i = 0; i < rows.length; i++) {
                    console.log(rows[i].nickname);
                    console.log(rows[i].link_address);
                    var lists = {
                        "nickname": rows[i].nickname,
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

    // 닉네임으로 검색했을 때 그 유저의 링크만 보여줌
    app.get('/link-page/search/:nickname', function (req, res) {
        //m_nickname = req.body.nickname;
        m_nickname = req.params.nickname;
        db.connetion.query('select nickname, link_address from user_info where nickname = ?', [m_nickname], function (err, rows, fields) {
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
                    console.log(rows[i].nickname);
                    console.log(rows[i].link_address);
                    var lists = {
                        "nickname": rows[i].nickname,
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
}