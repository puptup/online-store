import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import { MainWrapper } from '../Wrappers/MainWrapper'

export const NavBar = () => {
  const { cartState } = useGlobalContext()
  console.log(cartState)
  return (
    <Header>
      <MainWrapper>
        <HeaderWrapper>
          <NavLink to={'/'}>
            Kashavar<Span>&lsquo;</Span>s store
          </NavLink>
          <Nav>
            <NavLink to={'/catalog'}>Catalog</NavLink>
            <NavLink to={'/cart'}>
              Cart <span style={{ color: 'red' }}>{cartState.cart.length}</span>
            </NavLink>
          </Nav>
        </HeaderWrapper>
      </MainWrapper>
    </Header>
  )
}

const Span = styled.span`
  color: ${(props) => props.theme.primaryColor};
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
  opacity: 0.8;
  color: ${(props) => props.theme.secondaryColor};
  transition: opacity 0.1s ease-in;
  &:hover {
    opacity: 1;
  }
`

const Header = styled.header`
  width: 100%;
  position: absolute;
  border: 1px solid #eee;
`

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
