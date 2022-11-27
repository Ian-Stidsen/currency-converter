import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Converter from './pages/Converter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Converter />} />
      <Route path="/inflation" element={<Converter />} />
      <Route path="/rates" element={<Converter />} />
    </Routes>
  </BrowserRouter>
);
