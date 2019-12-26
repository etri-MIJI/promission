// import { SHA256 } from './sha256.js';
import { SHA1 } from './sha1.js';

console.log('register.js');

// console.log('SHA1:', SHA1('Hello world!!'));
//get address
$(document).ready(function() {
  let DEBUG = 1;

  var id;
  var password;
  var repassword;
  var nick;
  var game_id;
  var email;
  var account;
  let id_check_flag = false;
  let nick_check_flag = false;

  account_view();
  //metamask 계좌 가져오기
  async function account_view() {
    if (window.ethereum)
      try {
        await window.ethereum.enable();
        showInfo('ethereum.enable');
      } catch (err) {
        return showError('Access to your Ethereum account rejected.');
      }

    if (typeof web3 === 'undefined')
      return showError(
        'Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.'
      );

    const myAddress = web3.eth.accounts[0];
    console.log('test:', myAddress);
    $('#account').val(myAddress);
  }

  function showInfo(message) {
    $('#infoBox>p').html(message);
    $('#infoBox').show();
    $('#infoBox>header').click(function() {
      $('#infoBox').hide();
    });
  }

  function showError(errorMsg) {
    $('#errorBox>p').html('Error: ' + errorMsg);
    $('#errorBox').show();
    $('#errorBox>header').click(function() {
      $('#errorBox').hide();
    });
  }

  $('#register_button').on('click', function() {
    //html 값 받아오기

    password = $('#password').val();
    repassword = $('#repassword').val();
    game_id = $('#game_id').val();
    email = $('#email').val();
    account = $('#account').val();

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

            //DB에 post
            $.post(
              '/user/register',
              {
                user_id: id,
                nickname: nick,
                password: crypto_password,
                wallet_address: account,
                email: email,
                game_id: game_id,
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

  //id 중복 확인
  $('#id_check').on('click', function() {
    id = $('#id').val();
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
        } else if (data.result_code == 503) {
          $('#id_check').val('');
          $('#id_check').focus();
          alert('id가 중복됩니다.  다시 입력하여 주십시오.');
        } else {
          $('#id_check').val('');
          $('#id_check').focus();
          alert('중복 확인에 실패 했습니다. 다시 입력하여 주십시오.');
        } //end of if(result==200)
      }
    ); // end of post
  }); //end of id_check click

  //닉네임 중복 확인
  $('#nick_check').on('click', function() {
    nick = $('#nick').val();
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
        } else if (data.result_code == 503) {
          $('#nick_check').val('');
          $('#nick_check').focus();
          alert('nick가 중복됩니다.  다시 입력해 주십시오.');
        } else {
          $('#nick_check').val('');
          $('#nick_check').focus();
          alert('닉네임 중복 확인에 실패 했습니다. 다시 입력하여 주십시오.');
        } //end of if(result==200)
      }
    ); // end of post
  }); //end of nick_check click
}); //end of ready
