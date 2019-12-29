/************미션신청서 관련***************/
let vcMission = web3.eth.contract(MissionABI).at(MissionCA);

//킬미션... 신청자의 주소(from), 받는 BJ의 주소(to), 미션정보(kill, killAmount)를 저장하기 위함.
//function setInstructorKill의 argument : address, address, uint, uint

await vcMission.setInstructorKill(
  from,
  to,
  kill,
  killAmount,
  { from: account, gas: 2000000 },
  function(err, result) {
    if (err) console.log(err);
    else console.log(result);
  }
);

//등수미션... 신청자의 주소, 받는 BJ의 주소, 미션정보를 저장하기 위함.
//function setInstructorRank의 argument : address, address, uint, uint

await vcMission.setInstructorRank(
  from,
  to,
  kill,
  killAmount,
  { from: account, gas: 2000000 },
  function(err, result) {
    if (err) console.log(err);
    else console.log(result);
  }
);

//킬미션... 신청자의 주소를 입력하면 미션을 받은 BJ주소와 신청내용을 호출하기 위함
//function getInstructorKill의 argument : address
//address, uint, uint 리턴

vcMission.getInstructorKill(from),
  function(err, result) {
    if (err) console.log(err);

    // let BJ = result[0];
    // let kill = result[1].c.toString();
    // let killAmount = result[2].c.toString();
    // console.log(' to: ', BJ);
    // console.log(' kill: ', kill);
    // console.log(' killAmount: ', killAmount);
  };

//등수미션... 신청자의 주소를 입력하면 미션을 받은 BJ주소와 신청내용을 호출하기 위함
//function getInstructorKill의 argument : address
//address, uint, uint 리턴

vcMission.getInstructorRank(from),
  function(err, result) {
    if (err) console.log(err);

    // let BJ = result[0];
    // let rank = result[1].c.toString();
    // let rankAmount = result[2].c.toString();
    // console.log(' to: ', BJ);
    // console.log(' kill: ', rank);
    // console.log(' killAmount: ', rankAmount);
  };

/************토큰전송 관련***************/
let vcToken = web3.eth.contract(MissionABI).at(MissionCA);

//관리자가 사용자나 BJ에게 토큰 전송하기 위함
$('#welcomePMT').click(function() {
  let WelcomeToken = web3.toWei(5, 'ether');

  let killAmount = document.getElementById('killAmount').value;
  let token = web3.toWei(killAmount, 'ether');

  //회원가입시 사용자에게 토큰선물하려면 value값에 WelcomeToken사용
  //미션 성공실패시는 token 사용
  vc.transfer(to, WelcomeToken, { from: tokenAdmin_, gas: 2000000 }, function(
    err,
    result
  ) {
    if (err) console.log('err : ', err);
    else console.log('result : ', result);
  });

  vc.transfer(to, token, { from: to, gas: 2000000 }, function(err, result) {
    if (err) console.log('err : ', err);
    else console.log('result : ', result);
  });
});
