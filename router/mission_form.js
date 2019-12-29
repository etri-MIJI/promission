let db = require('./config')

module.exports = function (app) {

    /*
router.get('/user', function(req, res, next) {
    var json_code = { 'hello': 'world' };
    res.render('user', { title: 'Express', data: JSON.stringify(json_code) }); 
});
    */
    // 각 유저의 링크를 클릭했을 때 미션폼을 띄워준다
    app.get('/:user_id', function (req, res) {
        res.render('makeform.html');
    });

    // 각 유저의 미션폼에서 지갑 주소를 보내준다
    app.get('/wallet-address/:user_id', function (req, res) {
        m_user_id = req.params.user_id;
        db.connetion.query('select wallet_address from user_info where user_id = ?', [m_user_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.send({
                    result_code: 500,
                    message: '에러'
                });
            }

            if (rows.length > 0) {
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
    app.post('/submit/mission', function (req, res) {
        m_user_id = req.body.user_id;
        m_mission_tx = req.body.mission_tx;
        m_mission_type = req.body.mission_type;
        var datetime = new Date();
        db.connetion.query('insert into mission_info (user_id, mission_tx, mission_type, mission_time) values(?, ?, ?, ?);', [m_user_id, m_mission_tx, m_mission_type, datetime], function (err, rows, fields) {
            if (err) {
                console.log('/submit/mission err: ', err);
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