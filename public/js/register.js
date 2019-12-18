// import { SHA256 } from './sha256.js';
import { SHA1 } from './sha1.js';

console.log('register.js');

// console.log('SHA1:', SHA1('Hello world!!'));

$(document).ready(function() {
  let DEBUG = 1;
  $('#register_button').on('click', function() {
    //html 값 받아오기
    let id = $('#id').val();
    let password = $('#password').val();
    let repassword = $('#repassword').val();
    let nick = $('#nick').val();
    let email = $('#email').val();
    let account = $('#account').val();

    let exptext = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (id == '' || password == '' || nick == '' || email == '' || account == '') {
      alert('회원가입 양식을 전부 채워주십시오');
    } else {
      if (password != repassword) {
        if (DEBUG) {
          console.log('password:', password);
          console.log('repassword:', repassword);
        }
        alert('패스워드가 다릅니다. 다시 입력하여 주십시오');
        $('#repassword').focus();
      } else {
        if (exptext.test(email) == false) {
          alert('이메일 형식이 아닙니다. 다시 입력하여 주십시오');
          $('#email').focus();
        } else {
          //password 암호화
          let crypto_password = SHA1(password);
          if (DEBUG) console.log(crypto_password);

          //DB에 post
          $.post(
            '/user/register',
            {
              user_id: id,
              nickname: nick,
              password: crypto_password,
              wallet_address: account,
              email: email,
            },
            function(data) {
              console.log('register_button : ', data);
            }
          ); // end of post
        } //end of if
      } //end of |||||||
    } //end of email check
  }); // end of register_button
});
