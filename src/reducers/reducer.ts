import { Product } from '../types'
import { CatalogState, FilterValueArgs, FilterByRangeArgs, Sorting, FilterByValue } from './types'

const get = (name: string) => {
  const store = localStorage.getItem(name)
  if (store) {
    return JSON.parse(store)
  }
  return store
}

export const initialState: CatalogState = {
  shownProducts: [],
  products: [],
  filters: get('filtersByValue') || {},
  rangeFilters: get('filtersByRange') || {},
  sorting: get('sortingFilter') || Sorting.ASC,
  search: get('searchStatus') || '',
}

enum CatalogActionKind {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_FILTER_BY_VALUE = 'SET_FILTER_BY_VALUE',
  SET_FILTER_BY_RANGE = 'SET_FILTER_BY_RANGE',
  SET_SORTING = 'SET_SORTING',
  SET_SEARCH_STRING = 'SET_SEARCH_STRING',
  RESET_ALL_FILTERS = 'RESET_ALL_FILTERS',
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

interface SortingAction {
  type: CatalogActionKind.SET_SORTING
  payload: Sorting
}

interface SearchAction {
  type: CatalogActionKind.SET_SEARCH_STRING
  payload: string
}

interface ResetFiltersAction {
  type: CatalogActionKind.RESET_ALL_FILTERS
}

export type CatalogActions =
  | SetProductsAction
  | ValueFilterAction
  | RangeFilterAction
  | SortingAction
  | SearchAction
  | ResetFiltersAction

export function catalogReducer(state: CatalogState, action: CatalogActions): CatalogState {
  const { type } = action

  switch (type) {
    case CatalogActionKind.SET_PRODUCTS: {
      const { payload } = action
      state.products = payload
      state.shownProducts = getShownProducts(state)
      return { ...state }
    }
    case CatalogActionKind.SET_FILTER_BY_VALUE: {
      const { payload } = action
      const { field, value } = payload
      console.log(value)
      if (state.filters[field]) {
        state.filters[field] = [...(value as never)]
      } else {
        state.filters[field] = [...(value as never)]
      }
      state.shownProducts = getShownProducts(state)
      localStorage.setItem('filtersByValue', JSON.stringify(state.filters))
      return { ...state }
    }
    case CatalogActionKind.SET_FILTER_BY_RANGE: {
      const { payload } = action
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
      localStorage.setItem('filtersByRange', JSON.stringify(state.rangeFilters))
      return { ...state }
    }
    case CatalogActionKind.SET_SORTING: {
      const { payload } = action
      if (state.sorting !== payload) {
        state.sorting = payload
        state.shownProducts = getShownProducts(state)
      }
      localStorage.setItem('sortingFilter', JSON.stringify(state.sorting))
      return { ...state }
    }
    case CatalogActionKind.SET_SEARCH_STRING: {
      const { payload } = action
      if (state.search !== payload) {
        state.search = payload
        state.shownProducts = getShownProducts(state)
      }
      localStorage.setItem('searchStatus', JSON.stringify(state.search))
      return { ...state }
    }
    case CatalogActionKind.RESET_ALL_FILTERS: {
      state.filters = {}
      state.rangeFilters = {}
      state.sorting = Sorting.ASC
      state.search = ''

      localStorage.setItem('filtersByRange', JSON.stringify(state.rangeFilters))
      localStorage.setItem('filtersByValue', JSON.stringify(state.filters))
      localStorage.setItem('sortingFilter', JSON.stringify(state.sorting))
      localStorage.setItem('searchStatus', JSON.stringify(state.search))
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
      Object.entries(state.rangeFilters).every(
        ([field, value]) =>
          product[field as never] >= value.from && product[field as never] <= value.to,
      ),
    )
    .sort((productA, productB) => {
      switch (state.sorting) {
        case Sorting.ASC: {
          const nameA = productA.brand.toLowerCase(),
            nameB = productB.brand.toLowerCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        }
        case Sorting.DESC: {
          const nameA = productA.brand.toLowerCase(),
            nameB = productB.brand.toLowerCase()
          if (nameA > nameB) return -1
          if (nameA < nameB) return 1
          return 0
        }
        case Sorting.PriceASC: {
          return productA.price - productB.price
        }
        case Sorting.PriceDESC: {
          return productB.price - productA.price
        }
        case Sorting.MemoryASC: {
          return Number(productA.memory) - Number(productB.memory)
        }
        case Sorting.MemoryDESC: {
          return Number(productB.memory) - Number(productA.memory)
        }
      }
    })
    .filter((product) => {
      return product.name.includes(state.search) || product.brand.includes(state.search)
    })
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

export const resetFilters = (): ResetFiltersAction => {
  return {
    type: CatalogActionKind.RESET_ALL_FILTERS,
  }
}
