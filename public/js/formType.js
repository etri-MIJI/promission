let DEBUG = 1;

if (DEBUG) console.log('formType.js');
// let vc = web3.eth.contract(ContractABI).at(ContractAddress);
// let tokenAdmin = '0x6ceF05eefC7A51B5b7Cd0De37d7B722F12f8259A';
///////////////////////////////////미완성입니다
$(document).ready(function() {
  //radio1 버튼 클릭시 mission 보여줌
  $('#formtype1').on('click', function() {
    document.getElementById('formplace').innerHTML =
      "<h3>미션내용 : <input class='a' type=text id='kill'>킬 이상 시<br>" +
      "<input type=text id='killAmount'>PMT</h3>";
  });

  //radio2 버튼 클릭시 mission 보여줌
  $('#formtype2').on('click', function() {
    document.getElementById('formplace').innerHTML =
      "<h3>미션내용 : <input class='a' type=text id='rank'>등 이내 달성 시<br>" +
      "<input type=text id='rankAmount'>PMT</h3>";
  });
}); //end of document ready
