console.log('start!');

let vc = web3.eth.contract(PMTokenABI).at(PMTokenCA);
const tokenAdmin_ = '0x6ceF05eefC7A51B5b7Cd0De37d7B722F12f8259A';

$(document).ready(function() {
  if (web3.isConnected()) {
    console.log('connected');
  } else {
    console.log('not connected');
  }
  connect();

  //회원가입시 5토큰 주기
  $('#welcomePMT').click(function() {
    let to = document.getElementById('accountId').value;
    let token = web3.toWei(5, 'ether');

    console.log('tokenAdmin :', tokenAdmin_);
    console.log('to :', to);
    console.log('welcome token :', token);

    vc.transfer(to, token, { from: tokenAdmin_, gas: 2000000 }, function(
      err,
      result
    ) {
      if (err) console.log(err);
      else console.log(result);
    });
  });

  //미션신청시 저장 및 관리자계정으로 예치금보내기
  $('#applyBtnKill').click(function() {
    saveKillMission();
  });

  $('#applyBtnRank').click(function() {
    saveRankMission();
  });

  //새로고침하면 메타마스크연결되고, 계좌주소를 자동으로 가져옴
  async function connect() {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        console.log('ethereum.enable');
        // showInfo('ethereum.enable');
      } catch (err) {
        console.log('Access to your Ethereum account rejected.');
        // return showError('Access to your Ethereum account rejected.');
      }
    }

    if (typeof web3 === 'undefined')
      console.log(
        'Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.'
      );
    // return showError(
    //   'Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.'
    // );

    const myAddress = web3.eth.accounts[0];
    $('#accountId').val(myAddress);
  }

  //킬미션 신청내용 저장시키기
  async function saveKillMission() {
    let account = document.getElementById('accountId').value;
    let BJaccount = '0x4E75A02165DF03A257754f6fbf373b941Cf200bc'; //맞게 수정필요
    let kill = document.getElementById('kill').value;
    let killAmount = document.getElementById('killAmount').value;
    console.log('account :', account);
    console.log('bj', BJaccount);
    console.log('kill :', kill);
    console.log('killAmount :', killAmount);

    await vc.setInstructorKill(
      account,
      BJaccount,
      kill,
      killAmount,
      { from: account, gas: 2000000 },
      function(err, result) {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  }

  //등수미션 신청내용 저장시키기
  async function saveRankMission() {
    let account = document.getElementById('accountId').value;
    let BJaccount = '0x4E75A02165DF03A257754f6fbf373b941Cf200bc';
    let rank = document.getElementById('rank').value;
    let rankAmount = document.getElementById('rankAmount').value;
    console.log('account :', account);
    console.log('bj', BJaccount);
    console.log('rank :', rank);
    console.log('rankAmount :', rankAmount);

    vc.setInstructorRank(
      account,
      BJaccount,
      rank,
      rankAmount,
      { from: account, gas: 2000000 }, //이때 가스비는 우리가 부담해야하는거 아닌가?
      function(err, result) {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  }

  // function showInfo(message) {
  //   $('#infoBox>p').html(message);
  //   $('#infoBox').show();
  //   $('#infoBox>header').click(function() {
  //     $('#infoBox').hide();
  //   });
  // }

  // function showError(errorMsg) {
  //   $('#errorBox>p').html('Error: ' + errorMsg);
  //   $('#errorBox').show();
  //   $('#errorBox>header').click(function() {
  //     $('#errorBox').hide();
  //   });
  // }
});

//킬 미션 호출
let loadBtnKill = document.getElementById('loadBtnKill');
loadBtnKill.addEventListener('click', loadKill);

function loadKill() {
  let account = document.getElementById('accountId').value;
  vc.getInstructorKill(account, function(err, result) {
    if (err) console.log(err);
    let BJ = result[0].c.toString();
    let kill = result[1].c.toString();
    let killAmount = result[2].c.toString();
    console.log(' kill: ', BJ);
    console.log(' kill: ', kill);
    console.log(' killAmount: ', killAmount);
  });
}

//등수 미션 호출
let loadBtnRank = document.getElementById('loadBtnRank');
loadBtnRank.addEventListener('click', loadRank);

function loadRank() {
  let account = document.getElementById('accountId').value;
  vc.getInstructorRank(account, function(err, result) {
    if (err) console.log(err);
    let rank = result[0].c.toString();
    let rankAmount = result[1].c.toString();
    console.log(' rank: ', rank);
    console.log(' rankAmount: ', rankAmount);
  });
}

//미션성공시 배당금을 BJ에게 토큰전송하기
$('#Success').click(function() {
  let account = document.getElementById('accountId').value;
  vcMission.getInstructorKill(account, function(err, result) {
    if (err) console.log(err);
    let BJ = result[0];
    let kill = result[1].c.toString();
    let killAmount = result[2].c.toString();
    console.log(' -미션신청자: ', account);
    console.log(' BJ: ', BJ);
    console.log(' 관리자: ', tokenAdmin_);
    console.log(' kill: ', kill);
    console.log(' killAmount: ', killAmount);

    vcToken.transfer(
      BJ,
      web3.toWei(killAmount, 'ether'),
      { from: BJ, gas: 2000000 },
      function(err, result) {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  });
});
