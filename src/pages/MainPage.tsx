import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MainWrapper } from '../components/Wrappers/MainWrapper'

export const MainPage = () => {
  return (
    <MainWrapper>
      <Div>
        <h1 style={{ fontSize: 64, textAlign: 'center' }}>
          Welcome to <br />
          Kashavar<Span>&lsquo;</Span>s store
        </h1>
        <Link to={'/catalog'}>
          <Button>Start buying</Button>
        </Link>
      </Div>
    </MainWrapper>
  )
}

const Span = styled.span`
  color: ${(props) => props.theme.primaryColor};
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.3rem;
  background-color: rgba(140, 40, 255, 0.3);
  color: ${(props) => props.theme.primaryColor};
  opacity: 0.8;
  margin-top: 2rem;

  transition: all 0.1s ease-in;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`

const Div = styled.div`
  padding-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
