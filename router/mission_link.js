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

    // 각 유저의 링크를 클릭했을 때 미션폼을 띄워준다
    app.get('/:user_id', function(req, res){
        res.render('makeform.html');
    });

    // 각 유저의 미션폼에서 지갑 주소를 보내준다
    app.get('/wallet-address/:user_id', function (req, res){
        m_user_id = req.params.user_id;
        db.connetion.query('select wallet_address from user_info where user_id = ?',[m_user_id], function(err, rows, fields){
            if(err){
                console.log(err);
                res.send({
                    result_code: 500,
                    message: '에러'
                });
            }

            if(rows.length > 0){
                res.send({
                   result_code: 200,
                   message: rows[0].wallet_address 
                });
            }
            else {
                res.send({
                    result_code: 506,
                    message: '실패'
                });
            }
        });
        
    });

    // 미션폼 제출시 정보를 저장
    app.post('/submit/mission', function (req, res){
        m_user_id = req.body.user_id;
        m_mission_tx = req.body.mission_tx;
        m_mission_type = req.body.mission_type;
        var datetime = new Date();
        db.connetion.query('insert into mission_info (user_id, mission_tx, mission_type, mission_time) values(?, ?, ?, ?);',[m_user_id, m_mission_tx, m_mission_type, datetime], function(err, rows, fields){
            if(err){
                console.log('/submit/mission err: ',err);
                res.send({
                    result_code: 500,
                    message: '에러'
                });
            }
            else {
                console.log('/submic/mission rows: ', rows);
                res.send({
                    result_code: 200,
                    message: '성공'
                })
            }
        });
    });
}