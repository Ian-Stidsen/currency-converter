import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Converter from './pages/Converter';
import Inflation from './pages/Inflation';
import Rates from './pages/Rates';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Converter />} />
      <Route path="/inflation" element={<Inflation />} />
      {<Route path="/rates" element={<Rates />} />}
    </Routes>
  </BrowserRouter>
);
