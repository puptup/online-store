import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { MainPage } from './pages/MainPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { TemplatePage } from './pages/TemplatePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TemplatePage />}>
          <Route path='/' element={<MainPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='catalog' element={<CatalogPage />} />
          <Route path='product/:productID' element={<ProductPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
