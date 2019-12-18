console.log('logout.js');

$(document).ready(function() {
  $('#memleave_button').on('click', function() {
    //DB에 post
    $.post('/user/leave', {}, function(data) {
      console.log('memleave_button : ', data);
    }); // end of post
  }); //end of button
}); //end of ready
