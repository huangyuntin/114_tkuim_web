import React from 'react';

const ProductCard = ({ id, image, name, price, category, onDelete }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rimuru-light/50 relative">
      
      {/* 圖片區域 */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-rimuru-dark text-xs px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>
        
        {/* ⭐【新增】刪除按鈕 (平常隱藏，滑鼠移上去才出現) */}
        <button
          onClick={() => onDelete(id)}
          className="absolute top-3 left-3 bg-red-500/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
          title="刪除商品"
        >
          {/* 垃圾桶圖示 (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>

      {/* 內容區域 */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-text-main mb-1 truncate">{name}</h3>
        <p className="text-gray-700 font-bold text-lg">NT$ {price}</p>
        
        <button className="w-full mt-3 py-2 rounded-lg bg-rimuru-light text-rimuru-dark font-medium hover:bg-rimuru hover:text-white transition-colors">
          查看詳情
        </button>
      </div>
    </div>
  );
};

export default ProductCard;