// import { SHA256 } from './sha256.js';
import { SHA1 } from './sha1.js';

console.log('register.js');

// console.log('SHA1:', SHA1('Hello world!!'));

$(document).ready(function() {
  let DEBUG = 1;

  let id = $('#id').val();
  let password = $('#password').val();
  let repassword = $('#repassword').val();
  let nick = $('#nick').val();
  let game_id = $('#game_id').val();
  let email = $('#email').val();
  let account = $('#account').val();
  let id_check_flag = false;
  let nick_check_flag = false;

  $('#register_button').on('click', function() {
    //html 값 받아오기
    let exptext = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (id == '' || password == '' || nick == '' || email == '' || account == '' || game_id == '') {
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
          if (id_check_flag == true && id_check_flag == true) {
            //password 암호화
            let crypto_password = SHA1(password);
            if (DEBUG) console.log(crypto_password);

            let postData = {
              user_id: id,
              nickname: nick,
              password: crypto_password,
              wallet_address: account,
              email: email,
              game_id: game_id,
            };

            //DB에 post
            $.post(
              '/user/register',
              {
                postData,
              },
              function(data) {
                if (DEBUG) console.log('register post result : ', data);
                if (data.result_code == 200) {
                  alert('회원가입이 완료되었습니다!');
                  location.replace('/login-page');
                } else {
                  alert('회원가입에 실패하였습니다.');
                } //end of if(data.result_code==200)
              }
            ); // end of post
          } else {
            alert('ID 중복 확인과 닉네임 중복 확인을 해 주십시오');
          }
        } //end of if
      } //end of |||||||
    } //end of email check
  }); // end of register_button

  $('#id_check').on('click', function() {
    id_check_flag = false;

    $.post(
      '/user/check/id',
      {
        user_id: id,
      },
      function(data) {
        if (DEBUG) console.log('id_check : ', data);
        console.log('data.result_code:', data.result_code);
        if (data.result_code == 200) {
          id_check_flag = true;
          alert('id를 사용하실 수 있습니다.');
        } else {
          $('#id_check').val('');
          $('#id_check').focus();
          alert('id가 중복됩니다.  다시 입력해 주십시오.');
        } //end of if(result==200)
      }
    ); // end of post
  }); //end of id_check click

  $('#nick_check').on('click', function() {
    nick_check_flag = false;
    $.post(
      '/user/check/nickname',
      {
        nickname: nick,
      },
      function(data) {
        if (DEBUG) console.log('nick_check : ', data);
        console.log('data.result_code:', data.result_code);
        if (data.result_code == 200) {
          nick_check_flag = true;
          alert('닉네임을 사용하실 수 있습니다.');
        } else {
          $('#nick_check').val('');
          $('#nick_check').focus();
          alert('nick가 중복됩니다.  다시 입력해 주십시오.');
        } //end of if(result==200)
      }
    ); // end of post
  }); //end of nick_check click
}); //end of ready
