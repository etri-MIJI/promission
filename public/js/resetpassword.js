$(document).ready(function() {
  $('#resetpassword_sendbutton').on('click', function() {
    let id = document.getElementById('id');
    let email = document.getElementById('email');
    //DB에 post
    $.put(
      '/user/password/find',
      {
        user_id: id,
        email: email,
      },
      function(data) {
        console.log('resetpassword_button : ', data);
        if (data.result_code == 200) {
          alert(data.message);
          location.replace('/');
        }
      }
    ); // end of put
  }); //end of resetpassword_sendbutton
});
