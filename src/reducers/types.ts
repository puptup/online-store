import { Product } from '../types'

export interface CatalogState {
  shownProducts: Array<Product>
  products: Array<Product>
  filters: FilterByValue
  rangeFilters: FilterByRange
  sorting: Sorting
  search: string
}

export type FilterByValue = {
  [key in keyof Product]?: never[]
}

export type FilterValueArgs<T = keyof Product> = {
  field: T
  value: Product[keyof Product][]
}

export type FilterByRange = {
  [key in keyof Product]?: {
    from: number
    to: number
  }
}

export type FilterByRangeArgs<T = keyof Product> = {
  field: T
  value: {
    from: number
    to: number
  }
}

export enum Sorting {
  ASC,
  DESC,
  PriceASC,
  PriceDESC,
  MemoryASC,
  MemoryDESC,
}
