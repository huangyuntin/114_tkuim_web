const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // 引入剛剛建立的 Model

// ==========================================
// 1. 新增商品 (Create) - POST /api/products
// ==========================================
router.post('/', async (req, res) => {
  try {
    // 從前端傳來的資料 (req.body) 建立一個新的 Product 物件
    const newProduct = new Product(req.body);
    
    // 存入資料庫
    const savedProduct = await newProduct.save();
    
    // 回傳成功狀態 201 (Created) 與新增的資料
    res.status(201).json(savedProduct);
  } catch (error) {
    // 如果資料格式錯誤 (例如必填欄位沒填)，回傳 400 (Bad Request)
    res.status(400).json({ message: error.message });
  }
});

// ==========================================
// 2. 取得所有商品 (Read All) - GET /api/products
// ==========================================
router.get('/', async (req, res) => {
  try {
    // 尋找資料庫中所有商品，並依照建立時間新到舊排序
    const products = await Product.find().sort({ createdAt: -1 });
    
    // 回傳成功狀態 200 (OK) 與陣列資料
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 3. 取得單一商品 (Read Single) - GET /api/products/:id
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    // 根據網址上的 id 參數尋找商品
    const product = await Product.findById(req.params.id);
    
    // 如果找不到該 id 的商品，回傳 404 (Not Found)
    if (!product) {
      return res.status(404).json({ message: '找不到該商品' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 4. 更新商品 (Update) - PUT /api/products/:id
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    // findByIdAndUpdate(id, 更新內容, 選項)
    // { new: true } 代表回傳更新「後」的資料，而不是舊資料
    // { runValidators: true } 代表更新時也要檢查 Schema 格式 (例如價格不能為負)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ==========================================
// 5. 刪除商品 (Delete) - DELETE /api/products/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    res.status(200).json({ message: '商品已成功刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;