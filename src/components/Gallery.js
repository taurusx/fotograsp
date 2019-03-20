import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const GalleryWrapper = styled.section`
  max-width: 100%;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};
`

const Gallery = () => {
  return (
    <GalleryWrapper>
      <h1>Tytuł galerii</h1>
      <p>(Lista zdjęć)</p>
      <Link to="/">Powrót</Link>
    </GalleryWrapper>
  )
}

export default Gallery
