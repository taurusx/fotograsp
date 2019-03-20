import React from 'react'
import { ThemeProvider } from 'styled-components'

import Layout from './Layout'
import { NormalizeStyles } from './../styles/normalize'
import { GlobalStyles } from './../styles/global-styles'
import { themes } from './../styles/themes'

const App = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <Layout>
        <NormalizeStyles />
        <GlobalStyles />
      </Layout>
    </ThemeProvider>
  )
}

export default App
