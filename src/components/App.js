import React from 'react'
import { ThemeProvider } from 'styled-components'

import { NormalizeStyles } from './../styles/normalize'
import { GlobalStyles } from './../styles/global-styles'
import { themes } from './../styles/themes'

const App = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <div className="App">
        <NormalizeStyles />
        <GlobalStyles />
        <h1>Sample heading</h1>
        <p>Sample text.</p>
      </div>
    </ThemeProvider>
  )
}

export default App
