import React from 'react'

import { NormalizeStyles } from './../styles/normalize'
import { GlobalStyles } from './../styles/global-styles'

const App = () => {
  return (
    <div className="App">
      <NormalizeStyles />
      <GlobalStyles />
      <h1>Sample heading</h1>
      <p>Sample text.</p>
    </div>
  )
}

export default App
