console.log('logout.js');

$(document).ready(function() {
  $('#logout_button').on('click', function() {
    //DB에 post
    $.post('/user/logout', {}, function(data) {
      console.log('logout_button : ', data);
    }); // end of post
  }); //end of button
}); //end of ready
