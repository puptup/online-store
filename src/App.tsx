import React, { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StateContext } from './context'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { MainPage } from './pages/MainPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { TemplatePage } from './pages/TemplatePage'
import { cartReducer, initialCartState } from './reducers/cartReducer'
import { catalogReducer, initialState } from './reducers/catalogReducer'

const App = () => {
  const [state, dispatch] = useReducer(catalogReducer, initialState)
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState)

  return (
    <StateContext.Provider value={{ state, dispatch, cartState, cartDispatch }}>
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
