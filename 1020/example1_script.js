// example1_script.js
// 傳統語法：僅使用 var、function、字串串接

// 顯示提示窗（頁面載入時）
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '這行文字是由外部 JS 檔案寫入的。';

// 在按鈕下面顯示姓名與學號（可選）
var infoEl = document.getElementById('info');
if (infoEl) {
  infoEl.textContent = '姓名：黃韻庭　學號：412630302';
}

// 綁定按鈕點擊事件（使用 addEventListener，不在 HTML 放 onclick）
var btn = document.getElementById('myBtn');
if (btn) {
  btn.addEventListener('click', function () {
    alert('這是由外部 JS 顯示的 alert。');
  });
}
