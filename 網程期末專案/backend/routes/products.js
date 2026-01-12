const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

router.post('/', async (req, res) => {
  try {

    const newProduct = new Product(req.body);
    
    const savedProduct = await newProduct.save();
    
    res.status(201).json(savedProduct);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {

    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: '找不到該商品' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {

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