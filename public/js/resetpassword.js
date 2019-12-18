$(document).ready(function() {
  $('#resetpassword_sendbutton').on('click', function() {
    let id = document.getElementById('id');
    let email = document.getElementById('email');
    //DB에 post
    $.post(
      '/user/password/find',
      {
        user_id: id,
        email: email,
      },
      function(data) {
        console.log('resetpassword_button : ', data);
      }
    ); // end of post
  }); //end of login_button click
});
