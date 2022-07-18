import React from 'react'
import styled from 'styled-components'
import { MainWrapper } from '../Wrappers/MainWrapper'

export const Footer = () => {
  return (
    <FooterComponent>
      <MainWrapper>
        <FooterWrapper>
          <a href='https://rs.school/'>
            <img src='https://rs.school/images/rs_school_js.svg' style={{ width: '50px' }} />
          </a>
          <p>2022</p>
          <a href='https://github.com/puptup' style={{ color: 'black', textDecoration: 'none' }}>
            Author&lsquo;s github
          </a>
        </FooterWrapper>
      </MainWrapper>
    </FooterComponent>
  )
}

const FooterComponent = styled.footer`
  width: 100%;
  bottom: revert;
  border: 1px solid #eee;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
