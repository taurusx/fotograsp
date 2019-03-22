import { createGlobalStyle } from 'styled-components'

import { fontFamilySystem } from './globals'

export const GlobalStyles = createGlobalStyle`
  /* Imported font-face: "system" */
  ${fontFamilySystem}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "system";
    color: ${props => props.theme.foreground};
    background-color: ${props => props.theme.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
