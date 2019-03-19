import { createGlobalStyle } from 'styled-components'

import { fontFamilySystem } from './globals'

export const GlobalStyles = createGlobalStyle`
  /* Imported font-face: "system" */
  ${fontFamilySystem}

  body {
    font-family: "system";
  }
`
