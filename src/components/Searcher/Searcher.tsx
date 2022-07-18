import React, { FC, useEffect, useRef } from 'react'

interface SearcherProps {
  searchValue: string
  onChange: (value: string) => void
}

export const Searcher: FC<SearcherProps> = ({ searchValue, onChange }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <>
      <label htmlFor='search' style={{ marginBottom: '10px' }}>
        <h4>Search:</h4>
      </label>
      <input
        ref={ref}
        placeholder='brand, title...'
        onChange={(e) => onChange(e.target.value)}
        value={searchValue}
      />
    </>
  )
}
