import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.main`
  position: relative;
  flex: 1 0 auto;
  margin: 2rem;
  max-width: 100%;
  padding: 2rem;
  border-radius: 0.5rem;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};

  @media (max-width: 480px) {
    margin: 1rem;
  }
`

const Main = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>
}

export default Main
