import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Wrapper from './Wrapper'
import { NormalizeStyles } from './../styles/normalize'
import { GlobalStyles } from './../styles/global-styles'
import { themes } from './../styles/themes'

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <ThemeProvider theme={themes.light}>
          <Wrapper>
            <NormalizeStyles />
            <GlobalStyles />
          </Wrapper>
        </ThemeProvider>
      </ScrollToTop>
    </Router>
  )
}

export default App
