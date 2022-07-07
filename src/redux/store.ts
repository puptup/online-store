import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './reducers/catalogSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
