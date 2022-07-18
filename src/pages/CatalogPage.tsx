import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Product } from '../types'
import { setProducts } from '../reducers/catalogReducer'
import { useGlobalContext } from '../context'
import { Filters } from '../components/Filters/Filters'
import { Catalog } from '../components/Catalog/Catalog'

export const CatalogPage = () => {
  const { dispatch } = useGlobalContext()
  useEffect(() => {
    fetch('./products.json')
      .then((res) => res.json())
      .then((res: Product[]) => dispatch(setProducts(res)))
  }, [])

  return (
    <Div>
      <Filters />
      <Catalog />
    </Div>
  )
}

const Div = styled.div`
  padding-top: 58.5px;

  display: flex;
`
