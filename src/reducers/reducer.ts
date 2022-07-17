import { Product } from '../types'
import { CatalogState, FilterValueArgs, FilterByRangeArgs } from './types'

export const initialState: CatalogState = {
  shownProducts: [],
  products: [],
  filters: {},
  rangeFilters: {},
}

enum CatalogActionKind {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_FILTER_BY_VALUE = 'SET_FILTER_BY_VALUE',
  SET_FILTER_BY_RANGE = 'SET_FILTER_BY_RANGE',
}

interface SetProductsAction {
  type: CatalogActionKind.SET_PRODUCTS
  payload: Product[]
}

interface ValueFilterAction {
  type: CatalogActionKind.SET_FILTER_BY_VALUE
  payload: FilterValueArgs
}

interface RangeFilterAction {
  type: CatalogActionKind.SET_FILTER_BY_RANGE
  payload: FilterByRangeArgs
}

export type CatalogActions = SetProductsAction | ValueFilterAction | RangeFilterAction

export function catalogReducer(state: CatalogState, action: CatalogActions): CatalogState {
  const { type, payload } = action
  switch (type) {
    case CatalogActionKind.SET_PRODUCTS:
      state.products = payload
      state.shownProducts = getShownProducts(state)
      return { ...state }
    case CatalogActionKind.SET_FILTER_BY_VALUE: {
      const { field, value } = payload
      if (state.filters[field]) {
        const indexOfNewFilter = state.filters[field]!.indexOf(value as never)
        if (indexOfNewFilter !== -1) {
          state.filters[field]!.splice(indexOfNewFilter, 1)
        } else {
          state.filters[field]!.push(value as never)
        }
      } else {
        state.filters[field] = [value as never]
      }
      state.shownProducts = getShownProducts(state)
      return { ...state }
    }
    case CatalogActionKind.SET_FILTER_BY_RANGE: {
      const { field, value } = payload
      if (state.rangeFilters[field]) {
        state.rangeFilters[field]!.from = value.from
        state.rangeFilters[field]!.to = value.to
      } else {
        state.rangeFilters[field] = {
          from: value.from,
          to: value.to,
        }
      }

      state.shownProducts = getShownProducts(state)
      return { ...state }
    }
    default:
      return { ...state }
  }
}

const getShownProducts = (state: CatalogState) => {
  return state.products
    .filter((product) =>
      Object.entries(state.filters).every(
        ([filterField, values]) =>
          values.length === 0 || values.includes(product[filterField as never]),
      ),
    )
    .filter((product) =>
      Object.entries(state.rangeFilters).every(([field, value]) => {
        console.log(product[field as never], value.from, value.to)
        return product[field as never] >= value.from && product[field as never] <= value.to
      }),
    )
}

export const setProducts = (payload: Product[]): SetProductsAction => {
  return {
    type: CatalogActionKind.SET_PRODUCTS,
    payload: payload,
  }
}

export const setFilterByValue = (payload: FilterValueArgs): ValueFilterAction => {
  return {
    type: CatalogActionKind.SET_FILTER_BY_VALUE,
    payload: payload,
  }
}

export const setFilterByRange = (payload: FilterByRangeArgs): RangeFilterAction => {
  return {
    type: CatalogActionKind.SET_FILTER_BY_RANGE,
    payload: payload,
  }
}
