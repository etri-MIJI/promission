let DEBUG = 1;

if (DEBUG) console.log('missionsearch.js');

$(document).ready(function() {
  //DB에 미션폼 리스트 GET
  $.get('/link-page/list', function(data) {
    //let m = data[0].title;
    //console.log('data[0].title : ', m);
    let table = document.getElementById('linkTable');
    let length = data.list.length;
    //clearTable();
    console.log('data : ', data);
    for (let i = 0; i < length; i++) {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);

      cell1.innerHTML = i + 1;
      cell2.innerHTML = data.list[i].nickname;
      cell3.innerHTML = data.list[i].link_address;
    }
  }); //end of $.get('/link-page/list', function(data)

  $('#nick_search').on('click', function() {
    let nick = $('#nickname').val();

    if (DEBUG) console.log('nick:', nick);

    //DB로 닉네임 url이용하여 GET
    $.get('/link-page/search/' + nick, function(data) {
      //let m = data[0].title;
      //console.log('data[0].title : ', m);
      let table = document.getElementById('linkTable');
      table.innerHTML = '<tr><td>순번</td><td>닉네임</td><td>미션지 주소</td></tr>';
      let length = data.list.length;
      //clearTable();
      console.log('data : ', data);
      for (let i = 0; i < length; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = data.list[i].nickname;
        cell3.innerHTML = data.list[i].link_address;
      }
    }); // end of get
  });
});
