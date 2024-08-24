import React from 'react';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../src/index.css";
import { BrowserRouter , Router } from 'react-router-dom';
import ShopContextProvider from './Contaxt/ShopContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
  <App />
  </ShopContextProvider>
  
  </BrowserRouter>,
)
