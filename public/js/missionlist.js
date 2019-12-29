let DEBUG = 1;

$(document).ready(function() {
  let mission_transaction = '';

  //DB에 내 그동안의 미션 정보 리스트 get
  $.get('/mypage/record/list', {}, function(data) {
    console.log('mypage_mission_list : ', data);
    if (data.result_code == 200) {
      let table = document.getElementById('mission_list');
      let length = data.list.length;

      if (DEBUG) console.log('전체 data : ', data);

      for (let i = 0; i < length; i++) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        if (data.list[i].start_time == '') {
          mission_transaction = data.list[i].mission_tx;

          document.getElementById('mission_lo').innerHTML =
            "<button onclick='mission_ac(1)'>미션 수락</button><button onclick='mission_ac(0)'>미션 거절</button>";
        } else {
          cell1.innerHTML = i + 1;
          cell2.innerHTML = data.list[i].mission_tx;
          cell3.innerHTML = data.list[i].start_time;
          cell4.innerHTML = data.list[i].end_time;
          if (data.list[i].result == 1) {
            cell5.innerHTML = '성공';
          } else {
            cell5.innerHTML = '실패';
          }
        }
        // if(i==length){

        // }
      } //end of for
    } else {
      alert(data.message);
    } //end of if (data.result_code == 200) {
  }); // end of get

  //미션 수락 버튼 눌렀을 시

  function mission_ac(b) {
    let flag = b;

    //DB로 수락, 거절 post
    $.post(
      '/mission/accept',
      {
        mission_tx: mission_transaction,
        is_accept: flag,
      },
      function(data) {
        alert(data.message);
        if (data.result_code == 200) {
          document.getElementById('mission_lo').innerHTML =
            "<button onclick='mission_start()'>미션 시작</button>";
        }
      }
    ); // end of post
  } //end of mission_ac

  function mission_start() {
    //DB로 시작 post
    $.post(
      '/mission/start',
      {
        mission_tx: mission_transaction,
      },
      function(data) {
        alert(data.message);
        if (data.result_code == 200) {
          document.getElementById('mission_lo').innerHTML =
            "<button onclick='mission_end()'>미션 종료</button>";
        }
      }
    ); // end of post
  } //end of mission_start

  function mission_end() {
    //DB로 종료 post
    $.post(
      '/mission/end',
      {
        mission_tx: mission_transaction,
      },
      function(data) {
        alert(data.message);
        if (data.result_code == 200) {
          document.getElementById('mission_lo').innerHTML = '';
        }
      }
    ); // end of get
  } //end of mission_end
}); //end of $(document).ready(function()
