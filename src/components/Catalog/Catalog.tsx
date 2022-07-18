import React, { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import { resetCart } from '../../reducers/cartReducer'
import { ProductCard } from '../ProductCard/ProductCard'

const initialCartState = {
  cart: [],
}

export const Catalog: FC = () => {
  const { state, cartDispatch } = useGlobalContext()

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
  }, [cardsState, setCardsState])

  const onChange = useCallback(
    (value: number) => {
      if (cardsState) {
        if (cardsState.cart.length > 19) {
          alert('You cannot add more than 20 items to your cart')
        } else {
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
      }
    },
    [cardsState, setCardsState],
  )

  const resetHandler = useCallback(() => {
    cartDispatch(resetCart())
    setCardsState(initialCartState)
  }, [])

  return (
    <CatalogWrapper>
      <button style={{ position: 'absolute', top: '-1px', right: 0 }} onClick={resetHandler}>
        reset products
      </button>
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
  position: relative;
`
