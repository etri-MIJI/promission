let DEBUG = 1;

if (DEBUG) console.log('missionresult.js');

$(document).ready(function() {
  //DB에서 전체 리스트  get
  $.get('/result-page/list', function(data) {
    //let m = data[0].title;
    //console.log('전체 data[0].title : ', m);
    let table = document.getElementById('missionTable');
    table.innerHTML =
      '<tr><td>순번</td><td>닉네임</td><td>미션 트랜잭션 주소</td><td>미션 시작 시간</td><td>미션 종료 시간</td><td>미션 결과</td></tr>';
    let length = data.list.length;
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
      cell2.innerHTML = data.list[i].nickname;
      cell3.innerHTML = data.list[i].mission_tx;
      cell4.innerHTML = data.list[i].start_time;
      cell5.innerHTML = data.list[i].end_time;
      if (data.list[i].result == 1) {
        cell6.innerHTML = '성공';
      } else {
        cell6.innerHTML = '실패';
      }
    }
  }); // end of $.get('/result-page/list', function(data)

  //검색 버튼 클릭
  $('#nickname').on('click', function() {
    let nick = $('#mission_search').val();

    if (DEBUG) console.log('nick:', nick);

    //DB에 닉네임 서치해서 get
    $.get('/result-page/search/' + nick, function(data) {
      //let m = data[0].title;
      //console.log('서치 data[0].title : ', m);
      let table = document.getElementById('missionTable');
      table.innerHTML =
        '<tr><td>순번</td><td>닉네임</td><td>미션 트랜잭션 주소</td><td>미션 시작 시간</td><td>미션 종료 시간</td><td>미션 결과</td></tr>';
      let length = data.list.length;
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
        cell2.innerHTML = data.list[i].nickname;
        cell3.innerHTML = data.list[i].mission_tx;
        cell4.innerHTML = data.list[i].start_time;
        cell5.innerHTML = data.list[i].end_time;
        if (data.list[i].result == 1) {
          cell6.innerHTML = '성공';
        } else {
          cell6.innerHTML = '실패';
        }
      }
    }); // end of get
  }); //end of nick_search click
});
