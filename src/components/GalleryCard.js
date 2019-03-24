import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { PhotosDetailsContext } from './Wrapper'
import Loading from './Loading'

const ImageCard = styled.div`
  position: relative;
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

const MoreInfo = styled.div`
  position: absolute;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 1rem 0.5rem;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;
  background: #ffffffcc;
  color: ${props => props.theme.accent};
  font-weight: bold;
  text-shadow: 1px 1px 1px black;

  & > * {
    text-align: center;
    padding: 1rem 0.5rem;
    flex: 1 0 auto;
  }

  &.hidden {
    display: none;
  }
`

const GalleryCard = ({ photo, title }) => {
  // Single Photo Details
  const [photosDetails, getphotoDetails] = useContext(PhotosDetailsContext)

  const { id, color = '#FFFFFF', urls = {}, likes, description } = photo
  const { small, regular } = urls

  const { downloads = 0, location = {} } = photosDetails[id]
  const { title: locationTitle = '' } = location
  const moreInfo = [
    { info: likes, symbol: `🖤` },
    { info: downloads, symbol: `⭳` },
    { info: locationTitle, symbol: `🌐` },
  ].map(info =>
    info.info ? (
      <div key={info.symbol}>
        {info.symbol}
        {` `}
        {info.info}
      </div>
    ) : (
      ''
    ),
  )

  const [hover, setHover] = useState(false)
  const [loadingCompleted, setLoadingCompleted] = useState(false)

  useEffect(() => {
    if ('exif' in photosDetails[id] || 'location' in photosDetails[id])
      setLoadingCompleted(true)
  }, [])

  let timeout

  const handleCardHoverOn = () => {
    setHover(true)
    clearTimeout(timeout)
    if (loadingCompleted) return
    timeout = setTimeout(() => {
      getphotoDetails(id)
        .then(() => setLoadingCompleted(true))
        .catch(err => new Error(err))
    }, 300)
  }

  const handleCardHoverOff = () => {
    setHover(false)
  }

  return (
    <>
      {'regular' in urls ? (
        <Link to={`/photos/${id}/`}>
          <ImageCard
            id={id}
            color={color}
            onMouseOver={handleCardHoverOn}
            onMouseLeave={handleCardHoverOff}
          >
            <img src={small} alt={description || title} />
            <MoreInfo className={hover ? '' : 'hidden'} color={color}>
              {moreInfo}
              {loadingCompleted ? '' : <Loading style={{ height: '1.5rem' }} />}
            </MoreInfo>
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
