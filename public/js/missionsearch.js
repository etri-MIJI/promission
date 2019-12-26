let DEBUG = 1;

if (DEBUG) console.log('missionsearch.js');

$(document).ready(function() {
  //DB에 미션폼 리스트 GET
  $.get('/link-page/list', function(data) {
    let m = data[0].title;
    console.log('data[0].title : ', m);
    let table = document.getElementById('linkTable');
    let length = data.length;
    //clearTable();
    console.log('data : ', data);
    for (let i = 0; i < length; i++) {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      // let cell3 = row.insertCell(2);
      // let cell4 = row.insertCell(3);
      cell1.innerHTML = data[i].nickname;
      cell2.innerHTML = data[i].link_address;
    }
  }); //end of $.get('/link-page/list', function(data)

  $('#nick_search').on('click', function() {
    let id = $('#nickname').val();

    if (DEBUG) console.log('id:', id);

    //DB로 닉네임 url이용하여 GET
    $.get('/link-page/search/' + id, function(data) {
      let m = data[0].title;
      console.log('data[0].title : ', m);
      let table = document.getElementById('linkTable');
      let length = data.length;
      //clearTable();
      console.log('data : ', data);
      for (let i = 0; i < length; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        // let cell3 = row.insertCell(2);
        // let cell4 = row.insertCell(3);
        cell1.innerHTML = data[i].nickname;
        cell2.innerHTML = data[i].link_address;
        // cell3.innerHTML = data[i].author;
        // cell4.innerHTML = data[i].published_date;
      }
    }); // end of get
  });
});
