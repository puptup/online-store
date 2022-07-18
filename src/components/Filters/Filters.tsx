import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import {
  resetFilters,
  setFilterByRange,
  setFilterByValue,
  setSearchString,
  setSorting,
} from '../../reducers/reducer'
import { Sorting } from '../../reducers/types'
import { CheckBoxGroup } from '../CheckBoxGroup/CheckBoxGroup'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import { Searcher } from '../Searcher/Searcher'
import { SortingBox } from '../SortingBox/SortingBox'

const initFormValue = {
  color: [] as string[],
  brand: [] as string[],
  countRange: {
    from: 0,
    to: 200,
  },
  yearRange: {
    from: 2000,
    to: 2022,
  },
  sorting: Sorting.ASC,
  search: '',
}

const ALL_COLORS = ['red', 'black', 'white']
const ALL_BRANDS = ['Apple', 'Google', 'Xiaomi', 'Samsung']

export const Form = () => {
  const { dispatch } = useGlobalContext()
  const [formState, setFormState] = useState<{
    color?: string[]
    brand?: string[]
    countRange?: { from: number; to: number }
    yearRange?: { from: number; to: number }
    sorting?: Sorting
    search?: string
  }>()

  useEffect(() => {
    const storeFormState = localStorage.getItem('formState')

    if (storeFormState) {
      try {
        setFormState(JSON.parse(storeFormState))
      } catch (e) {
        console.log('error...', e)
      }
    } else {
      setFormState(initFormValue)
    }
  }, [])

  useEffect(() => {
    if (formState) {
      localStorage.setItem('formState', JSON.stringify(formState))
    }
  }, [formState])

  const onColorChange = useCallback((value: string[]) => {
    dispatch(setFilterByValue({ field: 'color', value: value }))
    setFormState((state) => ({
      ...state,
      color: value,
    }))
  }, [])

  const onBrandChange = useCallback((value: string[]) => {
    dispatch(setFilterByValue({ field: 'brand', value: value }))
    setFormState((state) => ({
      ...state,
      brand: value,
    }))
  }, [])

  const onCountRangeChange = useCallback((value: { from: number; to: number }) => {
    dispatch(setFilterByRange({ field: 'count', value: { from: value.from, to: value.to } }))
    setFormState((state) => ({
      ...state,
      countRange: value,
    }))
  }, [])

  const onYearRangeChange = useCallback((value: { from: number; to: number }) => {
    dispatch(setFilterByRange({ field: 'year', value: { from: value.from, to: value.to } }))
    setFormState((state) => ({
      ...state,
      yearRange: value,
    }))
  }, [])

  const onSearchChange = useCallback((value: string) => {
    dispatch(setSearchString(value))
    setFormState((state) => ({
      ...state,
      search: value,
    }))
  }, [])

  const onSortingChange = useCallback((value: Sorting) => {
    dispatch(setSorting(value))
    setFormState((state) => ({
      ...state,
      sorting: value,
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFormState({ ...initFormValue })
    dispatch(resetFilters())
  }, [])

  return (
    <>
      <SortingBox value={formState?.sorting || Sorting.ASC} onChange={onSortingChange}></SortingBox>
      <FilterCategory>
        <Searcher searchValue={formState?.search || ''} onChange={onSearchChange}></Searcher>
      </FilterCategory>
      <FilterCategory>
        <h4>Colors:</h4>
        <CheckBoxGroup
          field='color'
          checkedValues={formState?.color}
          onChange={onColorChange}
          values={ALL_COLORS}
        />
      </FilterCategory>
      <FilterCategory>
        <h4>Brands:</h4>
        <CheckBoxGroup
          field='brand'
          checkedValues={formState?.brand}
          onChange={onBrandChange}
          values={ALL_BRANDS}
        />
      </FilterCategory>
      <FilterCategory>
        <h4>Count:</h4>
        <RangeSlider
          rangeValues={formState?.countRange}
          onChange={onCountRangeChange}
          startValues={{ from: 0, to: 200 }}
        />
      </FilterCategory>
      <FilterCategory>
        <h4>Year:</h4>
        <RangeSlider
          rangeValues={formState?.yearRange}
          onChange={onYearRangeChange}
          startValues={{ from: 2000, to: 2022 }}
        />
      </FilterCategory>
      <button onClick={handleReset}>RESET</button>
    </>
  )
}

export const Filters = () => {
  return (
    <Filter>
      <Form />
    </Filter>
  )
}

const FilterCategory = styled.div`
  padding: 0 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`

const Filter = styled.div`
  height: calc(100vh - 58.5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`
