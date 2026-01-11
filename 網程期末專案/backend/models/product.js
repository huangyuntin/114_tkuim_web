const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // 1. 商品名稱 (必填)
  name: {
    type: String,
    required: [true, '請輸入商品名稱'], // 若未填寫會回傳這個錯誤訊息
    trim: true // 自動去除前後空白
  },
  // 2. 商品描述
  description: {
    type: String,
    required: false
  },
  // 3. 價格 (必填)
  price: {
    type: Number,
    required: [true, '請輸入商品價格'],
    min: 0 // 價格不能小於 0
  },
  // 4. 圖片連結 (必填) - 放你的 10 張圖片路徑
  imageUrl: {
    type: String,
    required: [true, '請提供商品圖片連結']
  },
  // 5. 類別 (例如：上衣、裙子)
  category: {
    type: String,
    required: [true, '請選擇商品類別'],
    enum: ['上衣', '褲子', '裙子', '外套', '配件', '其他'] // (選填) 可以限制只能輸入這些類別
  },
  // 6. 庫存狀態 (預設 true)
  inStock: {
    type: Boolean,
    default: true
  },
  // 7. 建立時間
  createdAt: {
    type: Date,
    default: Date.now // 若未指定，預設為當下時間
  }
});

// 建立 Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;