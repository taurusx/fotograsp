import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
  z-index: 10;
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
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 480px) {
    height: ${headerHeightMobile};
  }
`

const StyledLogoLink = styled(NavLink)`
  text-decoration: none;
  box-shadow: none;
  font-size: 150%;
  text-transform: none;
  letter-spacing: 2px;
  font-weight: bold;
  color: ${props => props.theme.fgContrast};
  transition: ${props =>
    `all ${props.theme.transition.duration} ${
      props.theme.transition.function
    }`};

  &.active {
    color: ${props => props.theme.accent};
    letter-spacing: 4px;
  }

  &:hover {
    color: ${props => props.theme.accent};
  }

  @media (max-width: 480px) {
    font-size: 120%;
  }
`

const Header = () => {
  return (
    <>
      <HeaderPlaceholder />
      <HeaderWrapper>
        <StyledLogoLink exact to="/">
          {SITE_TITLE}
        </StyledLogoLink>
      </HeaderWrapper>
    </>
  )
}

export default Header
