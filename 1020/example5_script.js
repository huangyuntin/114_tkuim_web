// example5_script.js
// 讓使用者輸入乘法範圍並顯示結果

document.getElementById('generateBtn').addEventListener('click', function() {
  var start = parseInt(document.getElementById('start').value);
  var end = parseInt(document.getElementById('end').value);
  var output = '';

  // 驗證輸入
  if (isNaN(start) || isNaN(end) || start < 1 || end > 9 || start > end) {
    output = '請輸入 1~9 之間，且起始數 ≤ 結束數的範圍！';
  } else {
    // 巢狀 for 產生指定範圍的乘法表
    for (var i = start; i <= end; i++) {
      for (var j = 1; j <= 9; j++) {
        output += i + 'x' + j + '=' + (i * j) + '\t';
      }
      output += '\n';
    }
  }

  document.getElementById('result').textContent = output;
});
