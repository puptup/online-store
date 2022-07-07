import React from 'react'
import styled from 'styled-components'
import { MainWrapper } from '../Wrappers/MainWrapper'

export const Footer = () => {
  return (
    <FooterComponent>
      <MainWrapper>
        <FooterWrapper>2022</FooterWrapper>
      </MainWrapper>
    </FooterComponent>
  )
}

const FooterComponent = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  border: 1px solid #eee;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`
