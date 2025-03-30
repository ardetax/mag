import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Comanda } from './components/Comanda';
import { CartProvider } from './context/CartContext';
import {NavBar} from "./components/NavBar";

//Маршрутизация
//Используется React Router v7 для организации переходов между компонентами.

function App() {
  return (
    // Оборачиваем приложение в CartProvider, чтобы иметь доступ к состоянию корзины
    <CartProvider>
      <Router>
        <NavBar />
        <div className="container center-container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/comanda" element={<Comanda />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;