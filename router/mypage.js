let db = require('./config')

module.exports = function (app) {
    // 마이페이지 - 내 정보
    app.get('/mypage', function (req, res) {
        if(!req.session.logined){
            console.log('mypage req.session.logined: ',req.session.logined);
            console.log('mypage req.session.user_id: ',req.session.user_id);
            res.render('register.html');
        }
        else {
            console.log('mypage req.session.logined: ',req.session.logined);
            console.log('mypage req.session.user_id: ',req.session.user_id);
            res.render('mypage.html');
        }
        //res.render('mypage.html');
    });

    // app.get('/mypage', function (req, res) {
    //     res.render('mypage.html')
    // });

    // 마이페이지 - 내 기록
    app.get('/mypage/record', function (req, res) {
        res.render('missionlist.html')
    });
}