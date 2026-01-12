import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

const HomePage = () => {
  const navigate = useNavigate();
  // 1. 定義狀態：products 用來存從後端抓回來的資料，loading 用來記錄是否正在讀取
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 使用 useEffect：網頁一打開就執行這裡面的程式
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 向後端 API 發送請求
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error('無法連線到伺服器');
        }
        
        const data = await response.json();
        setProducts(data); // 把抓到的資料存入狀態
      } catch (err) {
        setError(err.message);
        console.error("讀取失敗:", err);
      } finally {
        setLoading(false); // 無論成功失敗，都結束載入狀態
      }
    };

    fetchProducts();
  }, []); // 空陣列代表只在網頁剛載入時執行一次

// ⭐【新增】刪除功能的函式
  const handleDelete = async (id) => {
    // 1. 跳出確認視窗，避免誤刪
    const confirmDelete = window.confirm("確定要刪除這件商品嗎？");
    if (!confirmDelete) return;

    try {
      // 2. 發送 DELETE 請求給後端
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 3. 如果後端刪除成功，前端也要把這筆資料從狀態中移除 (這樣不用重整網頁也會消失)
        setProducts(products.filter(product => product._id !== id));
        alert("商品已刪除！");
      } else {
        alert("刪除失敗，請稍後再試");
      }
    } catch (err) {
      console.error("刪除錯誤:", err);
      alert("無法連線到伺服器");
    }
  };

  return (
    <div className="min-h-screen bg-soft-white font-sans">
      {/* 導覽列 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-rimuru rounded-full flex items-center justify-center text-white font-bold">S</div>
              <h1 className="text-2xl font-bold text-text-main tracking-wide">
                SHKEV <span className="text-rimuru text-sm font-normal">衣櫥</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="text-text-light hover:text-rimuru-dark transition-colors">所有商品</button>
              <button onClick={() => navigate('/add')} className="bg-rimuru text-white px-4 py-1.5 rounded-full hover:bg-rimuru-dark transition-colors shadow-md shadow-rimuru/30">
                新增商品
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主體內容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-text-main mb-2">本季精選</h2>
          <div className="w-16 h-1 bg-rimuru mx-auto rounded-full"></div>
          <p className="text-text-light mt-3">簡約舒適，穿出你的日常質感</p>
        </div>

        {/* 狀態顯示區域 */}
        {loading && (
          <p className="text-center text-rimuru-dark text-xl">資料載入中...</p>
        )}

        {error && (
          <p className="text-center text-red-500">發生錯誤: {error} <br/> 請確認後端 Server (Port 5000) 是否有開啟</p>
        )}

        {/* 如果沒錯誤且沒載入中，但資料庫是空的 */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p className="text-xl">目前架上沒有商品</p>
            <p className="text-sm mt-2">請透過 API 或後台新增商品資料</p>
          </div>
        )}

        {/* 商品網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product._id} // MongoDB 的 id 欄位是 _id
              id={product._id}
              image={product.imageUrl} // 我們資料庫欄位叫 imageUrl
              name={product.name}
              price={product.price}
              category={product.category}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;