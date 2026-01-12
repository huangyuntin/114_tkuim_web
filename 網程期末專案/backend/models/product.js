const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入商品名稱'], 
    trim: true 
  },
  description: {
    type: String,
    required: false
  },

  price: {
    type: Number,
    required: [true, '請輸入商品價格'],
    min: 0 
  },

  imageUrl: {
    type: String,
    required: [true, '請提供商品圖片連結']
  },

  category: {
    type: String,
    required: [true, '請選擇商品類別']
  },
  quantity: { 
    type: Number, 
    default: 1 
 },

  inStock: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;