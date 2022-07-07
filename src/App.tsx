import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { MainPage } from './pages/MainPage'
import { ProductPage } from './pages/ProductPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route path='cart' element={<CartPage />} />
          <Route path='catalog' element={<CartPage />} />
          <Route path='product' element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
