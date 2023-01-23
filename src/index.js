import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

const Converter = lazy(() => import('./pages/Converter').then(module => {
  return { default: module.Converter };
}));

const Rates = lazy(() => import('./pages/Rates').then(module => {
  return { default: module.Rates };
}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route path="/" element={<Converter />} />
        <Route path="/rates" element={<Rates />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
