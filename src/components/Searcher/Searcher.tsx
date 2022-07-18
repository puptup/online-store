import React, { FC } from 'react'

interface SearcherProps {
  searchValue: string
  onChange: (value: string) => void
}

export const Searcher: FC<SearcherProps> = ({ searchValue, onChange }) => {
  return (
    <>
      <label htmlFor='search' style={{ marginBottom: '10px' }}>
        Search:
      </label>
      <input
        placeholder='brand, title...'
        onChange={(e) => onChange(e.target.value)}
        value={searchValue}
      />
    </>
  )
}
