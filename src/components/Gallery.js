import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import GalleryCard from './GalleryCard'

const GalleryWrapper = styled.section`
  width: 100%;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};
`

const GalleryGrid = styled.article`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
  grid-auto-rows: 400px;
  justify-content: space-around;

  @media (max-width: 480px) {
    grid-gap: 10px;
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground};

  &:hover {
    color: ${props => props.theme.accent};
  }
`

const Gallery = ({ match, collectionsArray }) => {
  const id = match.params.id
  console.log(id)
  const currentCollection = collectionsArray.filter(collection => {
    return collection.id == id
  })[0]
  console.log(currentCollection)
  const { images, title, total_photos } = currentCollection
  return (
    <GalleryWrapper>
      <h1>{title}</h1>
      <GalleryGrid>
        {images.map(photo => (
          <GalleryCard key={photo.id} photo={photo} title={title} />
        ))}
      </GalleryGrid>
      <StyledLink to="/">Powrót</StyledLink>
    </GalleryWrapper>
  )
}

export default Gallery
