import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ImageCard = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0.5rem;
  background-color: ${props => props.theme.bgTopView};
  box-shadow: 5px 5px 10px ${props => props.theme.fgTopView};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${props => props.color};
  }

  &:hover {
    cursor: zoom-in;
    background-color: ${props => props.color};
    box-shadow: 5px 5px 20px;
  }
`

const GalleryCard = ({ photo, title }) => {
  const { id, color, urls = {}, likes, description } = photo
  const { small, regular } = urls
  return (
    <>
      {'regular' in urls ? (
        <Link to={`/photos/${id}/`}>
          <ImageCard regular={regular} id={id} color={color} likes={likes}>
            <img src={small} alt={description || title} />
          </ImageCard>
        </Link>
      ) : (
        <ImageCard regular={regular} id={id} color={color} likes={likes}>
          <img src={small} alt={description || title} />
        </ImageCard>
      )}
    </>
  )
}

export default GalleryCard
