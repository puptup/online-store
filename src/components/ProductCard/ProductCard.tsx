import React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Div>
      <Img src={product.image} />
      <h4>{product.brand}</h4>
      <h3>{product.name}</h3>
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
      <Button>Add to cart</Button>
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
  background-color: rgba(140, 40, 255, 0.3);
  color: ${(props) => props.theme.primaryColor};
  opacity: 0.8;
`
