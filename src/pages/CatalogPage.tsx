import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { Product } from '../types'
import 'nouislider/distribute/nouislider.css'
import { setProducts } from '../reducers/reducer'
import { useGlobalContext } from '../context'
import { Filters } from '../components/Filters/Filters'

export const CatalogPage = () => {
  const { state, dispatch } = useGlobalContext()
  useEffect(() => {
    fetch('./products.json')
      .then((res) => res.json())
      .then((res: Product[]) => dispatch(setProducts(res)))
  }, [])

  return (
    <Div>
      <Filters />
      <Catalog>
        {state.shownProducts ? (
          state.shownProducts.map((product) => {
            return <ProductCard product={product} key={product.id} />
          })
        ) : (
          <div>123</div>
        )}
      </Catalog>
    </Div>
  )
}

const Catalog = styled.div`
  gap: 20px 100px;
  background-color: #eee;
  border-radius: 10px;
  flex-wrap: wrap;
  display: flex;
  padding: 20px;
  width: 100%;
`

const Div = styled.div`
  padding-top: 58.5px;

  display: flex;
`
