import { createContext, useContext } from 'react'
import { CatalogActions, initialState } from '../reducers/reducer'
import { CatalogState } from '../reducers/types'

export type Context = {
  state: CatalogState
  dispatch: React.Dispatch<CatalogActions>
}

export const StateContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
})

export const useGlobalContext = () => useContext(StateContext)
