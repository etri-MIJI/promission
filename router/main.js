// 페이지 이동

module.exports = function (app) {
   // 메인페이지
   app.get('/', function (req, res) {
      res.render('index.html')
   });

   //로그인 페이지
   app.get('/login-page', function (req, res) {
      res.render('login.html')
   });

   // 회원가입 페이지
   app.get('/register-page', function (req, res) {
      res.render('register.html')
   });

   // about 페이지
   app.get('/about-page', function (req, res) {
      res.render('about.html')
   });

   // 미션 링크 검색 페이지
   app.get('/link-page', function (req, res) {
      res.render('missionsearch.html');
   });

   // 미션 결과 페이지
   app.get('/result-page', function (req, res) {
      res.render('missionresult.html')
   });

   // 미션 정보 페이지
   app.get('/mission-info-page', function (req, res) {
      res.render('missioninfo.html')
   });

   app.get('/mypage1', function(req, res){
      res.render('mypage.html');
   })

   app.get('/mypage2', function(req, res){
      res.render('missionlist.html');
   })
}
