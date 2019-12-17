module.exports = function (app) {

    // 회원가입
    app.post("/user/register", function (req, res) {
        /*
        let id = req.params.id;
        console.log(id);
        */

        let m_user_id = req.body.user_id;
        let m_nickname = req.body.nickname;
        let m_password = req.body.password;
        let m_walletAddress = req.body.wallet_address;
        let m_email = req.body.email;

        // DB에 저장
        

        //items.push(item);

        // 어디서 실패하는지 생각해보고 if 조건
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 로그인
    app.post("/user/login", function (req, res){
        let m_user_id = req.body.user_id;
        let m_password = req.body.password;

        // DB에 저장된 내용과 비교


        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 로그아웃
    app.post("/user/logout", function (res){
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 비밀번호 찾기
    app.post("/user/find/password", function (req, res){
        let m_user_id = req.body.user_id;
        let m_email = req.body.email;

        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });

    // 서비스 탈퇴
    app.post("/user/leave", function (res){
        res.send({
            result_code: 200,
            message: '회원가입 성공'
        });
    });
}