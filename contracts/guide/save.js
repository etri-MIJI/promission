console.log('start!');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

if (web3.isConnected()) {
  console.log('connected');
} else {
  console.log('not connected');
  exit;
}
let account = '0x14bec7433fe9479d82c5878d3f3184a720705ec9';
var contractAddress = '0x61d5f36dd8145ecd11d1356fd4d62c1ca8a30961';
var vc = web3.eth.contract(abi).at(contractAddress);

//킬 미션 저장
let applyBtnKill = document.getElementById('applyBtnKill');
applyBtnKill.addEventListener('click', applyKill);

function applyKill() {
  let condition = document.getElementById('abovekill').value;
  let kill = document.getElementById('perkill').value;
  let killAmount = document.getElementById('killAmount').value;
  console.log('킬 조건 : ', condition);
  console.log('몇 킬당 : ', kill);
  console.log('킬 당 이더 : ', killAmount);

  vc.setInstructorKill(
    account,
    condition,
    kill,
    killAmount,
    { from: account, gas: 2000000 },
    function(err, result) {
      if (err) console.log(err);
      else console.log(result);
    }
  );
}

//킬 미션 호출
let loadBtnKill = document.getElementById('loadBtnKill');
loadBtnKill.addEventListener('click', loadKill);

function loadKill() {
  vc.getInstructorKill(account, function(err, result) {
    if (err) console.log(err);
    let abovekill = result[0].c.toString();
    let perkill = result[1].c.toString();
    let killAmount = result[2].c.toString();
    console.log(' abovekill: ', abovekill);
    console.log(' perkill: ', perkill);
    console.log(' killAmount: ', killAmount);
  });
}

//등수 미션 저장
let applyBtnRank = document.getElementById('applyBtnRank');
applyBtnRank.addEventListener('click', applyRank);

function applyRank() {
  let rank = document.getElementById('rank').value;
  let rankAmount = document.getElementById('rankAmount').value;
  console.log('달성해야하는 등수 : ', rank);
  console.log('달성 시 이더 : ', rankAmount);

  vc.setInstructorRank(
    account,
    rank,
    rankAmount,
    { from: account, gas: 2000000 },
    function(err, result) {
      if (err) console.log(err);
      else console.log(result);
    }
  );
}

//등수 미션 호출
let loadBtnRank = document.getElementById('loadBtnRank');
loadBtnRank.addEventListener('click', loadRank);

function loadRank() {
  vc.getInstructorRank(account, function(err, result) {
    if (err) console.log(err);
    let rank = result[0].c.toString();
    let rankAmount = result[1].c.toString();
    console.log(' rank: ', rank);
    console.log(' rankAmount: ', rankAmount);
  });
}
