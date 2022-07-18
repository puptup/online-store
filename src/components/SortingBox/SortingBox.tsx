import React, { FC } from 'react'
import { Sorting } from '../../reducers/types'

interface SortingBoxProps {
  value: Sorting
  onChange: (value: Sorting) => void
}

export const SortingBox: FC<SortingBoxProps> = ({ value, onChange }) => {
  return (
    <>
      <h4 style={{ marginBottom: '10px' }}>Sorting:</h4>
      <select
        name='select'
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as Sorting)}
      >
        <option value={Sorting.ASC}>By title, from A to Z</option>
        <option value={Sorting.DESC}>By title, from Z to A</option>
        <option value={Sorting.PriceASC}>By price, ascending</option>
        <option value={Sorting.PriceDESC}>By price, descending</option>
        <option value={Sorting.MemoryASC}>By memory, ascending</option>
        <option value={Sorting.MemoryDESC}>By memory, descending</option>
      </select>
    </>
  )
}
