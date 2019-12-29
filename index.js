let express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser');
//const ChromeLauncher = require('chrome-launcher'); // 크롬 브라우저를 열기 위한 것
const session = require('express-session'); // 로그인 세션 유지를 위해 필요
const FileStore = require('session-file-store')(session);

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'dbswnchlrh', // 세션을 암호화해줌. secret 필수 옵션, 노출되면 안 된다
    resave: false, // 세션을 항상 저장할지 여부를 정하는 값
    saveUninitialized: true, // 초기화되지 않은 채 스토어에 저장되는 세션. 세션이 필요하기 전까지 세션을 구동시키지 않음
    store: new FileStore() // 데이터를 저장하는 형식
}))

let router = require('./router/main')(app); // /router/main을 연결시킨 것
let login = require('./router/login')(app)
let mission_form = require('./router/mission_form')(app)
let mission_link = require('./router/mission_link')(app)
let mission_result = require('./router/mission_result')(app)
let mypage = require('./router/mypage')(app)

let port = 3000;

// views 안에 html 파일들이 있다
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// public 폴더에 있는 것들을 사용한다
app.use(express.static('public'));

// 웹서버 실행
let server = app.listen(port, function () {
    console.log("Express server has started on port " + port)
});

