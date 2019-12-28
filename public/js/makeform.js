//formType.js에 DEBUG가 있어서 오류 뜨므로 주석
// let DEBUG = 1;
////////////////////////////
////////////////////////////
///////////////////////////////맨 아래 get 미완성
if (DEBUG) console.log('makeform.js');
let vc = web3.eth.contract(ContractABI).at(ContractAddress);
let tokenAdmin = '0x6ceF05eefC7A51B5b7Cd0De37d7B722F12f8259A';
//bj account
let wallet_address = '';

$(document).ready(function() {
  //web3 연동
  if (web3.isConnected()) {
    console.log('connected');
  } else {
    console.log('not connected');
  }

  //계좌 불러오는 함수 먼저 실행
  account_view();

  //계좌 불러오는데에 필요한 함수 async function account_view(),showInfo(message), showError(errorMsg)
  async function account_view() {
    if (window.ethereum)
      try {
        await window.ethereum.enable();
        showInfo('ethereum.enable');
      } catch (err) {
        return showError('Access to your Ethereum account rejected.');
      }

    if (typeof web3 === 'undefined')
      return showError(
        'Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.'
      );

    const myAddress = web3.eth.accounts[0];
    console.log('myAddress:', myAddress);
    $('#myAccountId').val(myAddress);
  }

  function showInfo(message) {
    $('#infoBox>p').html(message);
    $('#infoBox').show();
    $('#infoBox>header').click(function() {
      $('#infoBox').hide();
    });
  }

  function showError(errorMsg) {
    $('#errorBox>p').html('Error: ' + errorMsg);
    $('#errorBox').show();
    $('#errorBox>header').click(function() {
      $('#errorBox').hide();
    });
  }

  //미션 취소 버튼 클릭시 메인화면으로 이동
  $('#missioncancel').on('click', function() {
    alert('미션을 취소하셨습니다. 메인 화면으로 돌아갑니다.');
    location.replace('/');
  }); //end of  $('#missioncancel').on('click',function(){

  //미션 제출 클릭시, 값 받아오고 컨트랙트 보내고 DB로 저장 요청 보내기
  $('#missionSubmit').on('click', function() {
    let account = $('#accountId').val();
    let missionType = $(':input:radio[name=formtype]:checked').val();
    let myAccount = document.getElementById('myAccountId').value;
    let transactionHash = '';

    if (DEBUG) {
      console.log('account:', account);
      console.log('myAccount :', myAccount);
      console.log('missionType :', missionType);
    }

    //mission type에 따른 컨트랙트 전송
    if (missionType == 1) {
      let kill = document.getElementById('kill').value;
      let killAmount = document.getElementById('killAmount').value;

      if (DEBUG) {
        console.log('kill :', kill);
        console.log('killAmount :', killAmount);
      }

      if (missionType !== '' && kill !== '' && killAmount !== '') {
        saveKillMission();
        //킬미션 신청내용 저장시키기
        async function saveKillMission() {
          if (DEBUG) console.log('savekillMission');
          await vc.setInstructorKill(
            myAccount,
            kill,
            killAmount,
            { from: myAccount, gas: 2000000 },
            function(err, result) {
              if (err) console.log(err);
              else {
                console.log(result);
                transactionHash = result;
                sendTransaction(transactionHash);
              }
            }
          );
        }
      } else {
        alert('정보를 제대로 입력해주세요');
      }
    } else if (missionType == 2) {
      let rank = document.getElementById('rank').value;
      let rankAmount = document.getElementById('rankAmount').value;

      if (DEBUG) {
        console.log('rank :', rank);
        console.log('rankAmount :', rankAmount);
      }
      if (missionType !== '' && rank !== '' && rankAmount !== '') {
        saveRankMission();
        //등수미션 신청내용 저장시키기
        async function saveRankMission() {
          if (DEBUG) console.log('saveRankMission');
          await vc.setInstructorRank(
            myAccount,
            rank,
            rankAmount,
            { from: myAccount, gas: 2000000 },
            function(err, result) {
              if (err) console.log(err);
              else {
                console.log(result);
                transactionHash = result;
                sendTransaction(transactionHash);
              }
            }
          );
        }
      } else {
        alert('정보를 제대로 입력해주세요.');
      }
    }

    // if (DEBUG) console.log('transactionHash:', transactionHash);
    function sendTransaction(a) {
      let transactionHash = a;
      console.log('transactionHash:', transactionHash);

      //DB에 post
      $.post(
        '/mission/submit',
        {
          user_id: id,
          mission_tx: transactionHash,
          mission_type: missionType,
        },
        function(data) {
          console.log('missionform_post : ', data);
        }
      ); // end of post
      alert('미션 신청에 성공하였습니다.\n미션 트랜잭션 주소는' + transactionHash + '입니다.');
      location.replace('/');
    } //end of sendTransaction()
  }); //end of $('#missionSubmit').on('click',function(){

  //미션폼-지갑주소API
  $.get('/wallet-address/' + id, function(data) {
    if (data.result_code == 200) {
      ///id를 어떻게 알아내죵
      wallet_address = data.message;
      if (DEBUG) {
        console.log(data);
        console.log(wallet_address);
      }
    }
  }); // end of get
}); //end of document ready
