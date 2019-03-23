import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import GalleryCard from './GalleryCard'
import Loading from './Loading'

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

const LoadingArea = styled.div`
  min-height: 50px;
  padding: 1rem;
  display: flex;
  justify-content: center;
`

const ReturnArea = styled.p`
  text-align: right;
  padding: 1rem 1rem 0;

  @media (min-width: 480px) {
    font-size: 120%;
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground};
  font-weight: bold;

  &:hover {
    color: ${props => props.theme.accent};
  }
`

const Gallery = ({ match, collectionsArray }) => {
  const id = match.params.id
  const currentCollection = collectionsArray.filter(collection => {
    return collection.id == id
  })[0]
  console.log(currentCollection)
  const { images, title, total_photos } = currentCollection

  // Intersection Observer
  const [ref, inView] = useInView({
    rootMargin: '800px',
  })

  function loadMorePhotos() {
    console.log('Photos are being loaded.')
  }

  if (inView) loadMorePhotos()

  return (
    <GalleryWrapper>
      <h1>{title}</h1>
      <GalleryGrid>
        {images.map(photo => (
          <GalleryCard key={photo.id} photo={photo} title={title} />
        ))}
      </GalleryGrid>
      <LoadingArea ref={ref}>{inView ? <Loading /> : ''}</LoadingArea>
      <ReturnArea>
        To już koniec tej galerii. Zobacz także pozostałe{` `}
        <StyledLink to="/">KOLEKCJE</StyledLink>
      </ReturnArea>
    </GalleryWrapper>
  )
}

export default Gallery
