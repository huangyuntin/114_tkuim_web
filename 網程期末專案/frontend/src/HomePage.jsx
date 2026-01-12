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

// ⭐【新增區塊 1】資料分組邏輯 (放在 return 之前)
  // 利用 reduce 方法，將原本平坦的陣列，轉換成以類別為 Key 的物件
  // 例如: { "上衣": [商品A, 商品B], "褲子": [商品C] }
  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category || '其他'; // 如果沒有類別就歸類到「其他」
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  // ⭐【新增區塊 2】定義類別顯示順序 (選用)
  // 如果你不介意順序，可以跳過這段，直接用 Object.entries(groupedProducts) 渲染
  // 如果想固定順序，可以這樣寫：
  const categoryOrder = ['上衣', '下身'];
  // 過濾出目前有商品的類別，並依照順序排列
  const sortedCategories = categoryOrder.filter(cat => groupedProducts[cat]);
  // 把不在我們定義順序中的類別 (例如新加的類別) 放到最後面
  Object.keys(groupedProducts).forEach(cat => {
    if (!categoryOrder.includes(cat)) {
      sortedCategories.push(cat);
    }
  });

  return (
    <div className="min-h-screen bg-soft-white font-sans">
      {/* 導覽列 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src="/小白.jfif" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              <h1 className="text-2xl font-bold text-text-main tracking-wide">
                SHIRO's <span className="text-rimuru text-sm font-normal">SHOP 倉庫管理</span>
              </h1>
            </div>
            <div className="flex gap-4">
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
          <h2 className="text-3xl font-bold text-text-main mb-2">全品項商品</h2>
          <div className="w-16 h-1 bg-rimuru mx-auto rounded-full"></div>
        </div>

        {/* 狀態顯示區域 */}
        {loading && (
          <p className="text-center text-rimuru-dark text-xl">資料載入中...</p>
        )}

        {error && (
          <p className="text-center text-red-500">發生錯誤: {error} <br/> 請確認後端 Server (Port 5000) 是否有開啟</p>
        )}

        {/* ⭐【修改區塊 3】原本的單一 Grid 替換成下面這樣 */}
        {/* 遍歷排序好的類別，一個類別產生一個區塊 */}
        {!loading && !error && sortedCategories.map((categoryName) => (
          <div key={categoryName} className="mb-12"> {/* 每個類別區塊底部留白 */}
            
            {/* 類別標題 */}
            <div className="flex items-center mb-6">
               <h3 className="text-2xl font-bold text-text-main px-2 border-l-4 border-rimuru">
                 {categoryName}專區
               </h3>
               <div className="h-px bg-gray-200 flex-grow ml-4"></div> {/* 裝飾用的分隔線 */}
            </div>

        {/* 商品網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {groupedProducts[categoryName].map((product) => (
            <ProductCard 
              key={product._id} // MongoDB 的 id 欄位是 _id
              id={product._id}
              image={product.imageUrl} // 我們資料庫欄位叫 imageUrl
              name={product.name}
              price={product.price}
              //category={product.category}
              quantity={product.quantity}
              onDelete={handleDelete}
            />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;