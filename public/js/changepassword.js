import { SHA1 } from './sha1.js';

$(document).ready(function() {
  $('#changepassword_button').on('click', function() {
    let password = document.getElementById('password');
    let oldpassword = document.getElementById('old_password');

    let crypto_newpassword = SHA1(password);
    let crypto_oldpassword = SHA1(passwoldpasswordord);

    if (DEBUG) console.log(crypto_password);
    //DB에 post
    $.put(
      '/user/password/change',
      {
        user_id: id,
        old_pw: crypto_oldpassword,
        new_pwd: crypto_newpassword,
      },
      function(data) {
        console.log('change_password : ', data);
        if (data.result_code == 200) {
          alert(data.message);
          location.replace('/');
        }
      }
    ); // end of put
  }); //end of changepassword_button
});
