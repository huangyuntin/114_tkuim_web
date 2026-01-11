import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate();
  
  // 表單狀態
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '上衣', // 預設值
    imageUrl: '/images/1.jpg', // 預設給一個範例路徑，方便你修改
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止表單重新整理
    
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('🎉 商品新增成功！');
        navigate('/'); // 成功後跳轉回首頁
      } else {
        alert('新增失敗，請檢查欄位是否正確');
      }
    } catch (error) {
      console.error('錯誤:', error);
      alert('無法連線到伺服器');
    }
  };

  return (
    <div className="min-h-screen bg-soft-white p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-text-main mb-6 text-center">新增商品</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 商品名稱 */}
          <div>
            <label className="block text-text-main font-medium mb-2">商品名稱</label>
            <input 
              type="text" 
              name="name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rimuru"
              placeholder="例如：親膚條紋水貂毛毛衣"
            />
          </div>

          {/* 價格與類別 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-main font-medium mb-2">價格 (NT$)</label>
              <input 
                type="number" 
                name="price" 
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rimuru"
              />
            </div>
            <div>
              <label className="block text-text-main font-medium mb-2">類別</label>
              <select 
                name="category" 
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rimuru"
              >
                <option value="上衣">上衣</option>
                <option value="褲子">褲子</option>
                <option value="裙子">裙子</option>
                <option value="外套">外套</option>
                <option value="配件">配件</option>
              </select>
            </div>
          </div>

          {/* 圖片路徑 */}
          <div>
            <label className="block text-text-main font-medium mb-2">圖片路徑</label>
            <input 
              type="text" 
              name="imageUrl" 
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rimuru"
              placeholder="/images/1.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">請輸入放在 public/images 資料夾內的檔案名稱</p>
          </div>

          {/* 按鈕區域 */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-1/3 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit" 
              className="w-2/3 py-3 rounded-xl bg-rimuru text-white font-bold hover:bg-rimuru-dark transition-colors shadow-md"
            >
              確認新增
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;