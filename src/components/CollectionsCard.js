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

const CollectionsCard = ({ collection }) => {
  const { id, title, total_photos, slug, images } = collection

  return (
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
  )
}

export default CollectionsCard
