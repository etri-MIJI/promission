module.exports = function (app) {
   // 페이지 이동
   // 메인페이지
   app.get('/', function (req, res) {
      res.render('main.html')
   });

   //로그인 페이지
   app.get('/login', function (req, res) {
      res.render('login.html')
   });

   // 회원가입 페이지
   app.get('/register', function (req, res) {
      res.render('register.html')
   });

   // about 페이지
   app.get('/about', function (req, res) {
      //res.render('index.html')
   });

   // 미션지 검색 페이지
   app.get('/mission_link', function (req, res) {
      res.render('missionform_search.html')
   });

   // 미션 결과 페이지
   app.get('/mission_result', function (req, res) {
      //res.render('.html')
   });

   // 미션 정보 페이지
   app.get('/mission_info', function (req, res) {
      res.render('missiontx_search.html')
   });

   // 마이페이지 - 내 정보
   app.get('/mypage', function (req, res) {
      res.render('mypage.html')
   });

   // 마이페이지 - 내 기록
   app.get('/mypage/record', function (req, res) {
      //res.render('index.html')
   });
}