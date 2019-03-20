import React from 'react'
import styled from 'styled-components'

import { SITE_TITLE } from './../utils/constants'

const headerHeight = '4.5rem'
const headerHeightMobile = '3.5rem'

const HeaderPlaceholder = styled.div`
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 100%;
  height: ${headerHeight};

  @media (max-width: 480px) {
    height: ${headerHeightMobile};
  }
`

const HeaderWrapper = styled.header`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: ${headerHeight};
  color: ${props => props.theme.fgContrast};
  background-color: ${props => props.theme.bgContrast};
  margin: 0;
  padding: 0.6rem 2rem;
  overflow: hidden;
  transition: ${props =>
    `all ${props.theme.transition.duration} ${
      props.theme.transition.function
    }`};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 480px) {
    height: ${headerHeightMobile};
  }
`

const Header = () => {
  return (
    <>
      <HeaderPlaceholder />
      <HeaderWrapper>{SITE_TITLE}</HeaderWrapper>
    </>
  )
}

export default Header
