import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import Collections from './Collections'
import Gallery from './Gallery'

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
      <Main>
        <Switch>
          <Route exact path="/" component={Collections} />
          <Route path="/collections/:id" component={Gallery} />
        </Switch>
      </Main>
    </LayoutWrapper>
  )
}

export default Layout
