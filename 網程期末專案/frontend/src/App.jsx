import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AddProductPage from './AddProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 首頁路徑 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 新增商品頁面路徑 */}
        <Route path="/add" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;