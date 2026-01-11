import React from 'react';

const ProductCard = ({ image, name, price, category }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rimuru-light/50">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-rimuru-dark text-xs px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-text-main mb-1 truncate">{name}</h3>
        <p className="text-rimuru-dark font-bold text-xl">NT$ {price}</p>
        <button className="w-full mt-3 py-2 rounded-lg bg-rimuru-light text-rimuru-dark font-medium hover:bg-rimuru hover:text-white transition-colors">
          查看詳情
        </button>
      </div>
    </div>
  );
};

export default ProductCard;