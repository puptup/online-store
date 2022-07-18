import React, { useCallback, useEffect, useState } from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import { addToCart, removeFromCart } from '../../reducers/cartReducer'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  choisedProducts: number[]
  onChange: (value: number) => void
}

export const ProductCard: FC<ProductCardProps> = ({ product, choisedProducts, onChange }) => {
  const { cartState, cartDispatch } = useGlobalContext()
  const [status, setStatus] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    if (!status) {
      if (cartState.cart.length > 19) {
        alert('You cannot add more than 20 products in your cart')
      } else {
        onChange(product.id)
        cartDispatch(addToCart(product.id))
        setStatus(true)
      }
    } else {
      onChange(product.id)
      cartDispatch(removeFromCart(product.id))
      setStatus(false)
    }
  }, [status, cartState])

  useEffect(() => {
    if (choisedProducts.includes(product.id)) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [choisedProducts])

  return (
    <Div>
      <Img src={product.image} />
      <h4>{product.brand}</h4>
      <h3>{product.name}</h3>
      <h6>{product.memory}gb</h6>

      <h5>{product.year}</h5>
      <p style={{ marginTop: 20, color: 'green' }}>{product.price}$</p>
      <div
        style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: 10 }}
      >
        <h6>in stock: {product.count}</h6>
        <h6>
          rating: <span style={{ color: '#5300ff' }}>{product.rating}★</span>
        </h6>
      </div>
      <Button
        onClick={handleClick}
        style={
          status
            ? { backgroundColor: 'rgba(14, 200, 25, 0.3)', color: 'rgba(14, 200, 25, 1)' }
            : { backgroundColor: 'rgba(140, 40, 255, 0.3)', color: 'rgba(140, 40, 255, 1)' }
        }
      >
        {!status ? 'Add to cart' : 'Remove from cart'}
      </Button>
    </Div>
  )
}

const Div = styled.div`
  height: fit-content;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 5px;
`

const Img = styled.img`
  width: 100px;
  height: 140px;
  margin-top: 10px;
`

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  color: ${(props) => props.theme.primaryColor};
  opacity: 0.8;
`
