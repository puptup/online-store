import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MainWrapper } from '../Wrappers/MainWrapper'

export const NavBar = () => {
  return (
    <Header>
      <MainWrapper>
        <HeaderWrapper>
          <NavLink to={'/'}>
            Kashavar&lsquo;<span style={{ color: 'red' }}>s</span> store
          </NavLink>
          <Nav>
            <NavLink to={'/catalog'}>Catalog</NavLink>
            <NavLink to={'/cart'}>Cart</NavLink>
          </Nav>
        </HeaderWrapper>
      </MainWrapper>
    </Header>
  )
}

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

  transition: opacity 0.1s ease-in;
  &:hover {
    opacity: 1;
  }
`

const Header = styled.header`
  width: 100%;
  position: fixed;
  border: 1px solid #eee;
`

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
