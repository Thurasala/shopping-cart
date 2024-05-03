import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import CartList from './components/CartList/CartList';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/cart' element={<CartList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
