import { SHA1 } from './sha1.js';

$(document).ready(function() {
  $('#changepassword_button').on('click', function() {
    let password = document.getElementById('password');
    let oldpassword = document.getElementById('old_password');

    let crypto_newpassword = SHA1(password);
    let crypto_oldpassword = SHA1(passwoldpasswordord);

    if (DEBUG) console.log(crypto_password);
    //DB에 post
    $.post(
      '/user/password/change',
      {
        user_id: id,
        old_pw: crypto_oldpassword,
        new_pwd: crypto_newpassword,
      },
      function(data) {
        console.log('login_button : ', data);
      }
    ); // end of post
  }); //end of login_button click

  //   $.get('/login-page', {}, function(data) {});
});
