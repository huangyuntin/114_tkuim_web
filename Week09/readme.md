【一、如何啟動後端（Server）】

1.進入 server 資料夾
cd server

2.安裝套件
npm install

3.啟動後端
npm run dev

若出現以下訊息代表成功：
Server running on http://localhost:3000

【二、如何啟動前端（Client）】

-> Live Server

在 VS Code 打開 client/signup_form.html

右鍵 → Open with Live Server

預設網址：http://127.0.0.1:5500/

【三、API 端點文件與測試方式】

（一）POST /api/signup
用途：提交報名資料
Request Body（JSON）：
{
"name": "test_user",
"email": "test@gmail.com
",
"phone": "0912345678",
"password": "abc12345",
"confirmPassword": "abc12345"
}

成功回應：
{
"success": true,
"message": "報名成功！"
}

（二）GET /api/signup
用途：取得目前報名清單
成功回應：
{
"total": 1,
"list": [
{ "name": "test_user", "email": "test@gmail.com
", "phone": "0912345678" }
]
}

【四、API 測試方式】

方法一：VS Code REST Client
打開 tests/api.http → 點 Send Request
內容：
POST http://localhost:3000/api/signup

Content-Type: application/json
{
"name": "test_user",
"email": "test@gmail.com
",
"phone": "0912345678",
"password": "abc12345",
"confirmPassword": "abc12345"
}

GET http://localhost:3000/api/signup

方法二：Postman

1/新增 POST /api/signup

2.Body → raw → JSON

3.新增 GET /api/signup

兩個 request 加入同一個 Collection

匯出成 signup_collection.json

放入 tests/ 資料夾