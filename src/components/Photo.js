import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { PhotosDetailsContext } from './Wrapper'
import Loading from './Loading'

const PhotoWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.fgTopView};
  background-color: ${props => props.theme.bgTopView};
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  min-height: 500px;
  margin: 1rem 0;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: ${props => props.color};
    box-shadow: 5px 5px 10px ${props => props.theme.fgTopView};
  }

  @media (max-width: 480px) {
    min-height: 250px;
    height: auto;

    img {
      height: auto;
    }
  }
`

const LoadingArea = styled.div`
  min-height: 40px;
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

const BackButton = styled.button`
  color: ${props => props.theme.foreground};
  background-color: ${props => props.theme.bgTopView};
  border: none;
  font-weight: bold;
  padding: 1rem;
  align-self: flex-start;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.accent};
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.foreground};
  font-weight: bold;

  &:hover {
    color: ${props => props.theme.accent};
  }
`

const Photo = ({ match }) => {
  const id = match.params.id
  // Single Photo Details
  const [photosDetails, getphotoDetails] = useContext(PhotosDetailsContext)
  let currentPhoto = id in photosDetails ? photosDetails[id] : ''
  const {
    color = '#FFFFFF',
    description = '',
    likes = 0,
    urls = {},
    user = {},
    exif = {},
    views = 0,
    downloads = 0,
  } = currentPhoto

  console.log(currentPhoto, id)
  const [loadingCompleted, setLoadingCompleted] = useState(false)

  useEffect(() => {
    if ('exif' in photosDetails[id] || 'location' in photosDetails[id])
      setLoadingCompleted(true)
  }, [])

  useEffect(() => {
    if (loadingCompleted) return
    getphotoDetails(id)
      .then(() => setLoadingCompleted(true))
      .catch(err => new Error(err))
  }, [loadingCompleted])

  return (
    <PhotoWrapper>
      <BackButton
        onClick={() => {
          window !== 'undefined' && window.history.back()
        }}
      >
        ⮜ POWRÓT
      </BackButton>
      {'regular' in urls ? (
        <ImageWrapper color={color}>
          <img src={urls.small} alt={description} />
        </ImageWrapper>
      ) : (
        ''
      )}

      {'name' in user ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={user.profile_image ? user.profile_image.medium : ''}
              style={{ borderRadius: '50%', margin: '1rem' }}
            />
            <div>
              <p>
                {' '}
                {user.name !== null ? user.name : '(nieznany)'}
                {user.location !== null ? `, from ${user.location}` : ''}
              </p>
              <p>
                <small>{user.bio !== null ? `${user.bio}` : ''}</small>
              </p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {'make' in exif ? (
        <div>
          Zdjęcię zrobione apratem:{' '}
          {exif.make !== null ? exif.make : '(brak danych)'}
          {exif.model !== null ? `, ${exif.model}.` : '.'}
        </div>
      ) : (
        ''
      )}
      {views ? (
        <div>Odwiedzin: {views !== null && views > 0 ? views : ''}</div>
      ) : (
        ''
      )}
      {downloads ? (
        <div>
          Pobrano:{' '}
          {downloads !== null && downloads > 1 ? `${downloads} razy` : ''}
        </div>
      ) : (
        ''
      )}
      {loadingCompleted ? (
        ''
      ) : (
        <LoadingArea>
          <Loading />
        </LoadingArea>
      )}
      <ReturnArea>
        Zobacz także pozostałe zdjęciach zebrane w{` `}
        <StyledLink to="/">KOLEKCJACH</StyledLink>
      </ReturnArea>
    </PhotoWrapper>
  )
}

export default Photo
