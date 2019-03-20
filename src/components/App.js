import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Layout from './Layout'
import { NormalizeStyles } from './../styles/normalize'
import { GlobalStyles } from './../styles/global-styles'
import { themes } from './../styles/themes'

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <ThemeProvider theme={themes.light}>
          <Layout>
            <NormalizeStyles />
            <GlobalStyles />
          </Layout>
        </ThemeProvider>
      </ScrollToTop>
    </Router>
  )
}

export default App
