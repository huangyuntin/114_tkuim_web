const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 載入 .env 設定

const productRoutes = require('./routes/products'); // 引入我們寫好的路由

const app = express();
const PORT = process.env.PORT || 5000;

// === 中介軟體 (Middleware) ===
app.use(cors()); // 允許跨網域請求 (讓前端 React 可以呼叫後端 API)
app.use(express.json()); // 解析 JSON 格式的請求內容

// === 資料庫連線 ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ 成功連接 MongoDB 資料庫');
  })
  .catch((err) => {
    console.error('❌ 資料庫連線失敗:', err);
  });

// === 路由設定 ===
// 所有與產品相關的 API 都會以 /api/products 開頭
app.use('/api/products', productRoutes);

// 測試路由 (確認伺服器有活著)
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// === 啟動伺服器 ===
app.listen(PORT, () => {
  console.log(`🚀 伺服器正在 Port ${PORT} 上運行`);
});