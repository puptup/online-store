import React from 'react'
import styled from 'styled-components'
import { MainWrapper } from '../components/Wrappers/MainWrapper'

export const MainPage = () => {
  return (
    <MainWrapper>
      <Div>
        <h1 style={{ fontSize: 64, textAlign: 'center' }}>
          Welcome to <br />
          Kashavar<span style={{ color: '#8c28ff' }}>&lsquo;</span>s store
        </h1>
        <Button>Start buying</Button>
      </Div>
    </MainWrapper>
  )
}

const Button = styled.button`
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.3rem;
  background-color: rgba(140, 40, 255, 0.3);
  color: #8c28ff;
  margin-top: 2rem;
`

const Div = styled.div`
  padding-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
