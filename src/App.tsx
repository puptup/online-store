import React, { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StateContext } from './context'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { MainPage } from './pages/MainPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { TemplatePage } from './pages/TemplatePage'
import { catalogReducer, initialState } from './reducers/reducer'

const App = () => {
  const [state, dispatch] = useReducer(catalogReducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
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
    </StateContext.Provider>
  )
}

export default App
