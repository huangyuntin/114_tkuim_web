// example3_script.js
// 使用 prompt 取得輸入，並做基本運算

var name = prompt('請輸入你的名字：');
if (!name) {
  name = '同學';
}

var a = prompt('請輸入數字 A：');
var b = prompt('請輸入數字 B：');

var numA = parseFloat(a);
var numB = parseFloat(b);

var output = '';
output += '哈囉，' + name + '！\n\n';
output += 'A = ' + numA + ', B = ' + numB + '\n';
output += 'A + B = ' + (numA + numB) + '\n';
output += 'A - B = ' + (numA - numB) + '\n';
output += 'A * B = ' + (numA * numB) + '\n';
output += 'A / B = ' + (numA / numB) + '\n';
output += 'A > B ? ' + (numA > numB) + '\n';
output += 'A == B ? ' + (numA == numB) + '（僅比較值）\n';
output += 'A === B ? ' + (numA === numB) + '（比較值與型態）\n';

alert('計算完成，請看頁面結果與 Console');
console.log(output);
document.getElementById('result').textContent = output;

/*
== 與 === 的差異：
------------------------------------------
1. ==（寬鬆相等）：
   只比較「值」是否相同，會自動轉換型態再比較。
   例如： '10' == 10 → true（因為字串 '10' 被轉成數字 10）

2. ===（嚴格相等）：
   會同時比較「值」與「資料型態」。
   例如： '10' === 10 → false（型態不同，一個是字串，一個是數字）

------------------------------------------
%（餘數運算）：
用來取得除法後的「餘數」。
例如： 7 % 3 → 1 （7 除以 3 餘下 1）
常見用途：
- 判斷奇偶數（num % 2 == 0 → 偶數）
- 每隔幾次執行特定動作（如每5筆資料換行）
*/