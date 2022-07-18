import React, { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import { ProductCard } from '../ProductCard/ProductCard'

const initialCartState = {
  cart: [],
}

export const Catalog: FC = () => {
  const { state } = useGlobalContext()

  const [cardsState, setCardsState] = useState<{ cart: number[] }>()
  useEffect(() => {
    const a = localStorage.getItem('cart')
    if (a) {
      try {
        setCardsState(JSON.parse(a))
      } catch (e) {
        console.error(e)
      }
    } else {
      setCardsState(initialCartState)
    }
  }, [])

  useEffect(() => {
    if (cardsState) {
      localStorage.setItem('cart', JSON.stringify(cardsState))
    }
  }, [cardsState])

  const onChange = useCallback(
    (value: number) => {
      if (cardsState) {
        if (cardsState.cart.includes(value)) {
          setCardsState((prev) => {
            if (prev) {
              const newCards = prev.cart.filter((id) => id !== value)
              return { cart: newCards }
            }
          })
        } else {
          setCardsState((prev) => {
            if (prev) {
              return { cart: [...prev.cart, value] }
            }
          })
        }
      }
    },
    [cardsState, setCardsState],
  )

  return (
    <CatalogWrapper>
      {state.shownProducts.length ? (
        state.shownProducts.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              choisedProducts={cardsState?.cart || []}
              onChange={onChange}
            />
          )
        })
      ) : (
        <div>Products not found</div>
      )}
    </CatalogWrapper>
  )
}

const CatalogWrapper = styled.div`
  gap: 20px 100px;
  background-color: #eee;
  border-radius: 10px;
  flex-wrap: wrap;
  display: flex;
  padding: 20px;
  width: 100%;
`
