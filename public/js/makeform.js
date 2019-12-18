function viewform(a) {
  let val = a;

  if (val == 1) {
    document.getElementById('formplace').innerHTML =
      "<h3>미션내용 : <input class='a' type=text id='killsu'>킬 이상 시<br>" +
      "<input class='a' type=text id='killwhrjs'>킬 당<br>" +
      "<input class='a' type=text id='ethersu'>ETH</h3>";
  } else if (val == 2) {
    document.getElementById('formplace').innerHTML =
      "<h3>미션내용 : <input class='a' type=text id='rank'>등 할 시<br>" +
      "<input class='a' type=text id='ethersu'>ETH</h3>";
  } else {
    alert('오류 발생, 폼을 다시 선택하여 주십시오');
  }
}
