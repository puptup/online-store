import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NotFoundPage = () => {
  return (
    <Div>
      <h1 style={{ marginBottom: '2rem' }}>404!</h1>
      <p>something went wrong...</p>
    </Div>
  )
}
