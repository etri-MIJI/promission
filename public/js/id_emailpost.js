$(document).ready(function() {
  $('#changepassword_button').on('click', function() {
    let id = document.getElementById('id');
    let email = document.getElementById('email');

    let password = document.getElementById('password');
    let crypto_password = SHA1(password);

    if (DEBUG) console.log(crypto_password);
    //DB에 post
    $.post(
      '/user/find/password',
      {
        user_id: id,
        email: email,
      },
      function(data) {
        console.log('login_button : ', data);
      }
    ); // end of post
  }); //end of login_button click

  //   $.get('/login-page', {}, function(data) {});
});
