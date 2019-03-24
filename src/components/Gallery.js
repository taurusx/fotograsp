import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import { PhotosLoadingContext } from './Wrapper'
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
  min-height: 40px;
  padding: 1rem;
  display: flex;
  justify-content: center;
`

const ObservatorArea = styled(LoadingArea)`
  display: block;

  &.loading,
  &.complete {
    display: none;
  }
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
  const { images, title, total_photos } = currentCollection

  // Photos Loading hooks
  const [photosLoading, setPhotosLoading] = useContext(PhotosLoadingContext)

  // Check if all photos are displayed in Gallery
  const [displayedCount, setDisplayedCount] = useState(0)

  let displayedAll = displayedCount === total_photos
  if (images && images.length > displayedCount) {
    setDisplayedCount(images.length)
    displayedAll = displayedCount === total_photos
  }

  // Intersection Observer
  const [ref, inView] = useInView({
    rootMargin: '800px',
  })

  if (inView && !photosLoading.loading && photosLoading.ready)
    loadMorePhotos(id)

  function loadMorePhotos(idString) {
    if (displayedAll) return
    const id = Number(idString)
    setPhotosLoading({ loading: true, ready: true, id: id })
  }

  const classNameLoading = photosLoading.loading ? ' loading ' : ''
  const classNameComplete = displayedAll ? ' complete ' : ''

  return (
    <GalleryWrapper>
      <h1>
        {title}
        {` `}
        <small>
          <em>
            ({total_photos}
            &nbsp;photos)
          </em>
        </small>
      </h1>
      <GalleryGrid>
        {images.map((photo, index) => (
          <GalleryCard
            key={`${photo.id}-${index}`}
            photo={photo}
            title={title}
          />
        ))}
      </GalleryGrid>
      <ObservatorArea
        ref={ref}
        className={`${classNameLoading} ${classNameComplete}`}
      />
      {displayedAll ? (
        <ReturnArea>
          To już koniec tej galerii. Zobacz także pozostałe{` `}
          <StyledLink to="/">KOLEKCJE</StyledLink>
        </ReturnArea>
      ) : (
        <LoadingArea>
          <Loading />
        </LoadingArea>
      )}
    </GalleryWrapper>
  )
}

export default Gallery
