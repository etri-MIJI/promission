import { SHA1 } from './sha1.js';

console.log('login.js');

$(document).ready(function() {
  $('#login_button').on('click', function() {
    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;

    //password 암호화
    let crypto_password = SHA1(password);

    //DB에 post
    $.post(
      '/user/login',
      {
        user_id: id,
        password: crypto_password,
      },
      function(data) {
        console.log('login_button : ', data);
      }
    ); // end of post
  }); //end of login_button click

  //   $.get('/login-page', {}, function(data) {});
});
