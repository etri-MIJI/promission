let DEBUG = 1;

$(document).ready(function() {
  //복사 버튼 클릭시 계좌 복사
  $('#account_copy').click(function(err, res) {
    let urlbox = document.getElementById('myaccount');
    // urlbox.value = document.getElementById('myaccount').value;
    urlbox.select();
    if (DEBUG) {
      console.log(urlbox);
      console.log(urlbox.select());
    }
    document.execCommand('copy');
    alert('URL 이 복사 되었습니다.');
  });

  //복사 버튼 클릭시 링크 url 복사
  $('#link_copy').click(function(err, res) {
    let urlbox = document.getElementById('missionlink');
    // urlbox.value = document.getElementById('myaccount').value;

    urlbox.select();
    if (DEBUG) {
      console.log(urlbox);
      console.log(urlbox.select());
    }
    document.execCommand('copy');
    alert('URL 이 복사 되었습니다.');
  });

  //QRcode 생성
  let privateKey = 'Ky2VG2TmERTXq5Cv7zk6fyhduv65ejnFx7fqi47vVyVPhnwVGCKP';
  let client = new CoinStack(
    'c7dbfacbdf1510889b38c01b8440b1',
    '10e88e9904f29c98356fd2d12b26de',
    'c3sp2.blocko.io',
    'https'
  );

  if (DEBUG) {
    console.log('client: ', client);
    console.log('starting...');
  }

  let qrcode = new QRCode(document.getElementById('qrcode'), {
    width: 250,
    height: 250,
  });

  function makeCode() {
    let elText = document.getElementById('myaccount');
    console.log('myaccount,', myaccount);
    if (!elText.value) {
      alert('Input a text');
      elText.focus();
      return;
    }
    qrcode.makeCode(elText.value);
  }

  //DB에서 어카운트와 링크 받아오기
  $.get('/mypage/info/list', function(data) {
    let myaccount = data.list[0].wallet_address;
    let mylink = data.list[0].link_address;

    $('#myaccount').val(myaccount);
    $('#missionlink').val(mylink);
    console.log(data);
    makeCode();
  }); // end of get

  // //회원 삭제 요청
  // $.post('/user/leave', function(data) {
  //   if (data.result_code == 200) {
  //       alert("회원이 삭제 되었습니다.")
  //   }
  // }); // end of get

  // //비밀번호 변경 요청
  // $.post('/user/password/change', function(data) {
  //   if (data.result_code == 200) {
  //   }
  // }); // end of get

  //   //미션폼-지갑주소API
  //   $.get('/wallet-address/' + id, function(data) {
  //     if (data.result_code == 200) {
  //       ///id를 어떻게 알아내죵
  //       wallet_address = data.message;
  //       if (DEBUG) {
  //         console.log(data);
  //         console.log(wallet_address);
  //       }
  //     }
  //   }); // end of get
}); //end of $(document).ready(function()
