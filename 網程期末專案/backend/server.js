const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/product');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] 收到請求: ${req.method} ${req.path}`);
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ 成功連接 MongoDB 資料庫"))
  .catch(err => console.error("❌ MongoDB 連線失敗:", err));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  console.log("進入 PUT 更新流程, ID:", req.params.id); 
  console.log("接收到的資料:", req.body); 

  try {
    const { id } = req.params;
    const updates = req.body;
    
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

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "商品已刪除" });
  } catch (error) {
    res.status(500).json({ message: "刪除失敗" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器正在 Port ${PORT} 上運行...`);
});