import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const LayoutWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
      <h1>Sample heading</h1>
      <p>Sample text.</p>
    </LayoutWrapper>
  )
}

export default Layout
