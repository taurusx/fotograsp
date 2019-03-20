import React from 'react'
import styled from 'styled-components'

const LayoutWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      {children}
      <h1>Sample heading</h1>
      <p>Sample text.</p>
    </LayoutWrapper>
  )
}

export default Layout
