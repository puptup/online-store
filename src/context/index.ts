import { CartAction, CartState, initialCartState } from './../reducers/cartReducer'
import { createContext, useContext } from 'react'
import { CatalogActions, initialState } from '../reducers/catalogReducer'
import { CatalogState } from '../reducers/types'

export type Context = {
  state: CatalogState
  dispatch: React.Dispatch<CatalogActions>
  cartState: CartState
  cartDispatch: React.Dispatch<CartAction>
}

export const StateContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
  cartState: initialCartState,
  cartDispatch: () => null,
})

export const useGlobalContext = () => useContext(StateContext)
