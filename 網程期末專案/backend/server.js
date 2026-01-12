const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/product');

const app = express();

// ======= 中介軟體 (Middleware) 設定區 =======
app.use(cors()); 
app.use(express.json()); // ⭐ 關鍵：這行讓後端看得懂 JSON 資料

// ⭐ 強力監視器：印出所有進來的請求 (Debug 用)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] 收到請求: ${req.method} ${req.path}`);
  next();
});

// ======= 資料庫連線 =======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ 成功連接 MongoDB 資料庫"))
  .catch(err => console.error("❌ MongoDB 連線失敗:", err));


// ======= API 路由區 =======

// 1. GET: 取得所有商品
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST: 新增商品
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. PUT: 更新商品 (包含庫存更新)
app.put('/api/products/:id', async (req, res) => {
  console.log("👉 進入 PUT 更新流程, ID:", req.params.id); // Debug
  console.log("📦 接收到的資料:", req.body); // Debug

  try {
    const { id } = req.params;
    const updates = req.body;
    
    // new: true 代表回傳更新後的資料
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    
    if (!updatedProduct) {
      console.log("❌ 找不到該 ID 的商品");
      return res.status(404).json({ message: "找不到該商品" });
    }
    
    console.log("✅ 更新成功！目前庫存:", updatedProduct.quantity);
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ 更新發生錯誤:", error);
    res.status(500).json({ message: "更新失敗" });
  }
});

// 4. DELETE: 刪除商品
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "商品已刪除" });
  } catch (error) {
    res.status(500).json({ message: "刪除失敗" });
  }
});

// ======= 啟動伺服器 =======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器正在 Port ${PORT} 上運行...`);
});