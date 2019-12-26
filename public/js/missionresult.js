let DEBUG = 1;

if (DEBUG) console.log('missionresult.js');

$(document).ready(function() {
  //DB에서 전체 리스트  get
  $.get('/result-page/list', function(data) {
    let m = data[0].title;
    console.log('전체 data[0].title : ', m);
    let table = document.getElementById('missionTable');
    let length = data.length;
    //clearTable();
    console.log('전체 data : ', data);
    for (let i = 0; i < length; i++) {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      // let cell4 = row.insertCell(3);
      cell1.innerHTML = i + 1;
      cell2.innerHTML = data[i].nickname;
      cell3.innerHTML = data[i].mission_tx;
      cell4.innerHTML = data[i].start_time;
      cell5.innerHTML = data[i].end_time;
      cell6.innerHTML = data[i].result;
    }
  }); // end of $.get('/result-page/list', function(data)

  //검색 버튼 클릭
  $('#nick_search').on('click', function() {
    let id = $('#nickname').val();

    if (DEBUG) console.log('id:', id);

    //DB에 닉네임 서치해서 get
    $.get('/result-page/search/' + id, function(data) {
      let m = data[0].title;
      console.log('서치 data[0].title : ', m);
      let table = document.getElementById('missionTable');
      let length = data.length;
      //clearTable();
      console.log('서치 data : ', data);
      for (let i = 0; i < length; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        // let cell4 = row.insertCell(3);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data[i].nickname;
        cell3.innerHTML = data[i].mission_tx;
        cell4.innerHTML = data[i].start_time;
        cell5.innerHTML = data[i].end_time;
        cell6.innerHTML = data[i].result;
      }
    }); // end of get
  });
});
