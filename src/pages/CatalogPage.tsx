import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { Product } from '../types'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'
import { setProducts, setFilterByValue, setFilterByRange } from '../reducers/reducer'
import { useGlobalContext } from '../context'

export const CatalogPage = () => {
  const { state, dispatch } = useGlobalContext()
  useEffect(() => {
    fetch('./products.json')
      .then((res) => res.json())
      .then((res: Product[]) => dispatch(setProducts(res)))
  }, [])

  return (
    <Div>
      <Filter>
        <div>
          <button onClick={() => dispatch(setFilterByValue({ field: 'color', value: 'red' }))}>
            Red
          </button>
        </div>
        <Nouislider
          range={{ min: 2000, max: 2022 }}
          start={[2000, 2022]}
          step={1}
          format={{
            to: function (value) {
              return value.toFixed(0)
            },
            from: function (value) {
              return Number(value)
            },
          }}
          connect
          tooltips={[true, true]}
          behaviour='tap-drag'
          style={{ fontSize: 14, width: '70%' }}
          onSlide={(a) =>
            dispatch(
              setFilterByRange({ field: 'year', value: { from: Number(a[0]), to: Number(a[1]) } }),
            )
          }
        />
        <Nouislider
          range={{ min: 0, max: 200 }}
          start={[0, 900]}
          step={1}
          connect
          tooltips={[true, true]}
          format={{
            to: function (value) {
              return value.toFixed(0)
            },
            from: function (value) {
              return Number(value)
            },
          }}
          behaviour='tap-drag'
          style={{ fontSize: 14, width: '70%' }}
          onSlide={(a) =>
            dispatch(
              setFilterByRange({ field: 'count', value: { from: Number(a[0]), to: Number(a[1]) } }),
            )
          }
        />
      </Filter>
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

const Filter = styled.div`
  height: calc(100vh - 58.5px);
  width: 250px;
`

const Div = styled.div`
  padding-top: 58.5px;

  display: flex;
`
