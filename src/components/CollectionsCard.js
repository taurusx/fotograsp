import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Collection = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.bgTopView};
  box-shadow: 3px 3px 5px ${props => props.theme.fgTopView};

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 5px ${props => props.theme.accent};
  }

  &.inactive:hover {
    cursor: default;
    box-shadow: 2px 2px 5px ${props => props.theme.fgTopView};
  }
`

const CollectionThumbs = styled.div`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 100px;
  width: 100%;
  height: 100%;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${props => props.color};
  }

  figure {
    margin: 0;
  }
`

const Placeholder = styled.div`
  width: 100%;
  background-color: #eee;
`

const CollectionsCard = ({ collection }) => {
  const { id, title, total_photos, slug, preview_photos } = collection
  const images = collection.images ? collection.images : []
  let placeholder = []
  if (images.length === 0) {
    const allSpaces = Math.min(total_photos, 10)
    const placeholderSpaces = allSpaces - preview_photos.length
    if (placeholderSpaces <= 0) return
    for (let i = 0; i < placeholderSpaces; i++) {
      placeholder[i] = <Placeholder key={i} />
    }
  }

  return (
    <>
      {images.length > 0 ? (
        <Link to={`/collections/${id}/${slug}`}>
          <Collection id={id}>
            <h2>{title}</h2>
            <CollectionThumbs>
              {images.map(photo => {
                return (
                  <figure key={photo.id}>
                    <img src={photo.urls.thumb} />
                  </figure>
                )
              })}
            </CollectionThumbs>
          </Collection>
        </Link>
      ) : (
        <Collection id={id} className="inactive">
          <h2>{title}</h2>
          <CollectionThumbs>
            {preview_photos.map(photo => {
              return (
                <figure key={photo.id}>
                  <img src={photo.urls.thumb} />
                </figure>
              )
            })}
            {placeholder}
          </CollectionThumbs>
        </Collection>
      )}
    </>
  )
}

export default CollectionsCard
