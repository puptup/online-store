import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CatalogState {
  value: number
}

const initialState: CatalogState = {
  value: 0,
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = catalogSlice.actions

export const selectCount = (state: RootState) => state.catalog.value

export default catalogSlice.reducer
