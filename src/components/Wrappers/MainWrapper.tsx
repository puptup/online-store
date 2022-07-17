import React, { FC } from 'react'
import styled from 'styled-components'

interface MainWrapperProps {
  children: React.ReactNode
}

export const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
`
