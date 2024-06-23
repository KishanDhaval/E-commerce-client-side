import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import 'antd/dist/reset.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthContextProvider>
)
